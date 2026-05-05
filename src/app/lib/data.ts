export type Mood = "bad" | "neutral" | "good";

export interface UserProfile {
  onboardingComplete: boolean;
  lifeStage: string;
  genderIdentity: string;
  isTrans: string;
  isOnHormones: string;
  pregnancyStatus: string;
  contraceptives: string[];
  wearableConnected: boolean;
  wearableType: string;
  dataRetentionDays: number;
  showPhaseIndicator?: boolean;
  notifications: boolean;
  dataSharing: boolean;
  anonymousAnalytics: boolean;
  autoDelete: boolean;
}

export interface CycleData {
  currentDay: number;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: string;
  nextPeriodEstimate: string;
}

export interface SymptomLog {
  id: string;
  date: string;
  bleeding: number;
  pain: number;
  mood: Mood;
  energy: number;
  notes: string;
  selectedSymptoms: string[];
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function getDefaultLastPeriodStart() {
  return addDays(new Date(), -14);
}

export const defaultUserProfile: UserProfile = {
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
  showPhaseIndicator: undefined,
  notifications: true,
  dataSharing: false,
  anonymousAnalytics: true,
  autoDelete: true,
};

export const defaultCycleData: CycleData = {
  currentDay: 15,
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: getDefaultLastPeriodStart().toISOString(),
  nextPeriodEstimate: new Date(
    getDefaultLastPeriodStart().getTime() + 28 * MS_PER_DAY,
  ).toISOString(),
};

function parseDateInput(value: string | Date) {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day, 12);
  }

  const parsed = new Date(value);
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12);
}

export function normalizeDateKey(value: string | Date) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = parseDateInput(value);
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function createSymptomLog(date = new Date()): SymptomLog {
  const parsedDate = parseDateInput(date);
  return {
    id: `log-${Date.now()}`,
    date: parsedDate.toISOString(),
    bleeding: 0,
    pain: 0,
    mood: "neutral",
    energy: 50,
    notes: "",
    selectedSymptoms: [],
  };
}

export function generateMockSymptomLogs() {
  const periodStart = getDefaultLastPeriodStart();
  return [
    {
      ...createSymptomLog(periodStart),
      id: "log-1",
      bleeding: 4,
      pain: 3,
      mood: "bad" as Mood,
      energy: 40,
      selectedSymptoms: ["Cramps", "Fatigue"],
      notes: "First day of period.",
    },
    {
      ...createSymptomLog(addDays(periodStart, 1)),
      id: "log-2",
      bleeding: 4,
      pain: 3,
      mood: "bad" as Mood,
      energy: 45,
      selectedSymptoms: ["Cramps", "Back pain"],
    },
    {
      ...createSymptomLog(addDays(periodStart, 2)),
      id: "log-3",
      bleeding: 3,
      pain: 2,
      mood: "neutral" as Mood,
      energy: 60,
    },
    {
      ...createSymptomLog(addDays(periodStart, 3)),
      id: "log-4",
      bleeding: 2,
      pain: 1,
      mood: "neutral" as Mood,
      energy: 70,
      selectedSymptoms: ["Bloating"],
    },
    {
      ...createSymptomLog(addDays(periodStart, 4)),
      id: "log-5",
      bleeding: 1,
      pain: 1,
      mood: "good" as Mood,
      energy: 75,
      notes: "Bleeding tapered off today.",
    },
  ];
}
