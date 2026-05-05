import {
  defaultCycleData,
  defaultUserProfile,
  generateMockSymptomLogs,
  type CycleData,
  type SymptomLog,
  type UserProfile,
} from "./data";

const API_BASE = "/api";

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchProfile() {
  return request<UserProfile>("/profile");
}

export async function saveProfile(profile: UserProfile) {
  return request<UserProfile>("/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}

export async function fetchCycleData() {
  return request<CycleData>("/cycle-data");
}

export async function saveCycleData(cycleData: CycleData) {
  return request<CycleData>("/cycle-data", {
    method: "PUT",
    body: JSON.stringify(cycleData),
  });
}

export async function fetchSymptomLogs() {
  return request<SymptomLog[]>("/symptom-logs");
}

export async function saveSymptomLogs(symptomLogs: SymptomLog[]) {
  return request<SymptomLog[]>("/symptom-logs", {
    method: "PUT",
    body: JSON.stringify(symptomLogs),
  });
}

export async function fetchExportData() {
  return request<{
    profile: UserProfile;
    cycleData: CycleData;
    symptomLogs: SymptomLog[];
    exportedAt: string;
  }>("/export");
}

export async function fetchInitialData() {
  try {
    const [profile, cycleData, symptomLogs] = await Promise.all([
      fetchProfile(),
      fetchCycleData(),
      fetchSymptomLogs(),
    ]);

    return { profile, cycleData, symptomLogs };
  } catch (error) {
    console.error("Unable to load backend data", error);
    return {
      profile: defaultUserProfile,
      cycleData: defaultCycleData,
      symptomLogs: generateMockSymptomLogs(),
    };
  }
}
