import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "store.json");
const port = Number(process.env.PORT || 3001);
const host = "127.0.0.1";
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function addDays(date, days) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function getDefaultLastPeriodStart() {
  return addDays(new Date(), -14);
}

function createSeedSymptomLog(date, overrides = {}) {
  return {
    id: overrides.id ?? `log-${date.getTime()}`,
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12,
    ).toISOString(),
    bleeding: 0,
    pain: 0,
    mood: "neutral",
    energy: 50,
    notes: "",
    selectedSymptoms: [],
    ...overrides,
  };
}

function getPeriodDayTemplate(dayOffset) {
  return [
    {
      bleeding: 4,
      pain: 3,
      mood: "bad",
      energy: 40,
      selectedSymptoms: ["Cramps", "Fatigue"],
      notes: "First day of period.",
    },
    {
      bleeding: 4,
      pain: 3,
      mood: "bad",
      energy: 45,
      selectedSymptoms: ["Cramps", "Back pain"],
    },
    {
      bleeding: 3,
      pain: 2,
      mood: "neutral",
      energy: 60,
    },
    {
      bleeding: 2,
      pain: 1,
      mood: "neutral",
      energy: 70,
      selectedSymptoms: ["Bloating"],
    },
    {
      bleeding: 1,
      pain: 1,
      mood: "good",
      energy: 75,
      notes: "Bleeding tapered off today.",
    },
  ][dayOffset] ?? {
    bleeding: 1,
    pain: 1,
    mood: "neutral",
    energy: 65,
  };
}

function createPeriodLog(date, dayOffset, id) {
  return createSeedSymptomLog(date, {
    id,
    ...getPeriodDayTemplate(dayOffset),
  });
}

function generateSeedSymptomLogs() {
  const periodStart = getDefaultLastPeriodStart();
  return Array.from({ length: 5 }, (_, dayOffset) =>
    createPeriodLog(
      addDays(periodStart, dayOffset),
      dayOffset,
      `log-${dayOffset + 1}`,
    ),
  );
}

const defaultStore = {
  profile: {
    onboardingComplete: false,
    lifeStage: "",
    genderIdentity: "",
    isTrans: "",
    isOnHormones: "",
    pregnancyStatus: "",
    contraceptives: [],
    wearableConnected: false,
    wearableType: "",
    dataRetentionDays: 60,
    notifications: true,
    dataSharing: false,
    anonymousAnalytics: true,
    autoDelete: true,
  },
  cycleData: {
    currentDay: 15,
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: getDefaultLastPeriodStart().toISOString(),
    nextPeriodEstimate: new Date(
      getDefaultLastPeriodStart().getTime() + 28 * MS_PER_DAY,
    ).toISOString(),
  },
  symptomLogs: generateSeedSymptomLogs(),
};

function normalizeDateKey(value) {
  const date = new Date(value);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function backfillPeriodLogs(cycleData, symptomLogs) {
  const latestPeriodStart = new Date(cycleData.lastPeriodStart);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const lookbackStart = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  const logsByDay = new Map(
    symptomLogs.map((log) => [normalizeDateKey(log.date), log]),
  );

  for (
    let periodStart = latestPeriodStart;
    periodStart >= lookbackStart;
    periodStart = addDays(periodStart, -cycleData.cycleLength)
  ) {
    for (let dayOffset = 0; dayOffset < cycleData.periodLength; dayOffset += 1) {
      const date = addDays(periodStart, dayOffset);
      const dateKey = normalizeDateKey(date);

      if (!logsByDay.has(dateKey) && date <= today) {
        logsByDay.set(
          dateKey,
          createPeriodLog(date, dayOffset, `period-log-${dateKey}`),
        );
      }
    }
  }

  return Array.from(logsByDay.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function normalizeStore(store) {
  const cycleData = {
    ...defaultStore.cycleData,
    ...(store.cycleData ?? {}),
  };
  const seededLogs =
    Array.isArray(store.symptomLogs) && store.symptomLogs.length > 0
      ? store.symptomLogs
      : defaultStore.symptomLogs;

  return {
    ...defaultStore,
    ...store,
    profile: {
      ...defaultStore.profile,
      ...(store.profile ?? {}),
    },
    cycleData,
    symptomLogs: backfillPeriodLogs(cycleData, seededLogs),
  };
}

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, JSON.stringify(defaultStore, null, 2));
  }
}

async function readStore() {
  await ensureStore();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw);
  const normalized = normalizeStore(parsed);

  if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
    await writeStore(normalized);
  }

  return normalized;
}

async function writeStore(store) {
  await writeFile(dataFile, JSON.stringify(store, null, 2));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload));
}

function notFound(response) {
  sendJson(response, 404, { error: "Not found" });
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  if (!request.url) {
    return notFound(response);
  }

  if (request.method === "OPTIONS") {
    return sendJson(response, 204, {});
  }

  const url = new URL(request.url, `http://${request.headers.host}`);

  try {
    const store = await readStore();

    if (request.method === "GET" && url.pathname === "/api/profile") {
      return sendJson(response, 200, store.profile);
    }

    if (request.method === "PUT" && url.pathname === "/api/profile") {
      store.profile = await readBody(request);
      await writeStore(store);
      return sendJson(response, 200, store.profile);
    }

    if (request.method === "GET" && url.pathname === "/api/cycle-data") {
      return sendJson(response, 200, store.cycleData);
    }

    if (request.method === "PUT" && url.pathname === "/api/cycle-data") {
      store.cycleData = await readBody(request);
      await writeStore(store);
      return sendJson(response, 200, store.cycleData);
    }

    if (request.method === "GET" && url.pathname === "/api/symptom-logs") {
      return sendJson(response, 200, store.symptomLogs);
    }

    if (request.method === "GET" && url.pathname === "/api/export") {
      return sendJson(response, 200, {
        profile: store.profile,
        cycleData: store.cycleData,
        symptomLogs: store.symptomLogs,
        exportedAt: new Date().toISOString(),
      });
    }

    if (request.method === "PUT" && url.pathname === "/api/symptom-logs") {
      store.symptomLogs = await readBody(request);
      await writeStore(store);
      return sendJson(response, 200, store.symptomLogs);
    }

    if (request.method === "DELETE" && url.pathname === "/api/symptom-logs") {
      store.symptomLogs = [];
      await writeStore(store);
      return sendJson(response, 200, store.symptomLogs);
    }

    return notFound(response);
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, { error: "Server error" });
  }
});

server.listen(port, host, () => {
  console.log(`API server listening on http://${host}:${port}`);
});
