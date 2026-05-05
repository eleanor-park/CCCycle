import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useUserProfile() {
  return useLocalStorage("userProfile", {
    onboardingComplete: false,
    lifeStage: "",
    genderIdentity: "",
    isTrans: "",
    isOnHormones: "",
    pregnancyStatus: "",
    contraceptives: [] as string[],
    wearableConnected: false,
    wearableType: "",
    dataRetentionDays: 60,
    showPhaseIndicator: undefined as boolean | undefined,
  });
}

export function shouldShowPhaseByDefault(profile: any) {
  const isNotTrans = profile.isTrans !== "yes";
  const isReproductiveAge = profile.lifeStage === "reproductive-age";
  const estrogenBasedContraceptives = ["pill", "iud-hormonal", "patch", "ring", "shot"];
  const usesEstrogenContraceptive = profile.contraceptives?.some((c: string) =>
    estrogenBasedContraceptives.includes(c)
  );

  return isNotTrans && isReproductiveAge && !usesEstrogenContraceptive;
}

export function useCycleData() {
  return useLocalStorage("cycleData", {
    currentDay: 15,
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: new Date().toISOString(),
    nextPeriodEstimate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
  });
}

function generateMockSymptomLogs() {
  const today = new Date();
  return [
    // Recent logs - current cycle
    { id: 1, date: today.toISOString(), bleeding: 0, pain: 1, mood: "neutral", energy: 70 },
    { id: 2, date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 75 },
    { id: 3, date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 3, pain: 2, mood: "neutral", energy: 60 },
    { id: 4, date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 4, pain: 3, mood: "bad", energy: 45 },
    { id: 5, date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 4, pain: 3, mood: "bad", energy: 40 },
    { id: 6, date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 2, pain: 1, mood: "neutral", energy: 70 },
    { id: 7, date: new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 85 },
    { id: 8, date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 80 },
    { id: 9, date: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 90 },
    { id: 10, date: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 1, mood: "neutral", energy: 75 },
    { id: 11, date: new Date(today.getTime() - 16 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 85 },
    { id: 12, date: new Date(today.getTime() - 18 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 85 },
    { id: 13, date: new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 1, mood: "neutral", energy: 70 },
    { id: 14, date: new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 2, mood: "neutral", energy: 60 },
    { id: 15, date: new Date(today.getTime() - 23 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 1, mood: "neutral", energy: 65 },
    { id: 16, date: new Date(today.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 1, pain: 2, mood: "bad", energy: 50 },
    { id: 17, date: new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 2, pain: 3, mood: "bad", energy: 45 },

    // Previous cycle
    { id: 18, date: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 3, pain: 3, mood: "bad", energy: 45 },
    { id: 19, date: new Date(today.getTime() - 31 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 4, pain: 4, mood: "bad", energy: 40 },
    { id: 20, date: new Date(today.getTime() - 32 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 4, pain: 3, mood: "bad", energy: 35 },
    { id: 21, date: new Date(today.getTime() - 33 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 4, pain: 4, mood: "bad", energy: 35 },
    { id: 22, date: new Date(today.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 3, pain: 2, mood: "neutral", energy: 50 },
    { id: 23, date: new Date(today.getTime() - 36 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 2, pain: 2, mood: "neutral", energy: 55 },
    { id: 24, date: new Date(today.getTime() - 38 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 1, pain: 1, mood: "neutral", energy: 60 },
    { id: 25, date: new Date(today.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 75 },
    { id: 26, date: new Date(today.getTime() - 42 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 80 },
    { id: 27, date: new Date(today.getTime() - 44 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 1, mood: "good", energy: 75 },
    { id: 28, date: new Date(today.getTime() - 46 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 85 },
    { id: 29, date: new Date(today.getTime() - 48 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 1, mood: "neutral", energy: 70 },
    { id: 30, date: new Date(today.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "neutral", energy: 75 },
    { id: 31, date: new Date(today.getTime() - 52 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 2, mood: "neutral", energy: 65 },
    { id: 32, date: new Date(today.getTime() - 54 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 1, pain: 2, mood: "bad", energy: 55 },
    { id: 33, date: new Date(today.getTime() - 55 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 75 },

    // Older cycle
    { id: 34, date: new Date(today.getTime() - 58 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 3, pain: 3, mood: "bad", energy: 45 },
    { id: 35, date: new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 4, pain: 4, mood: "bad", energy: 40 },
    { id: 36, date: new Date(today.getTime() - 62 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 3, pain: 3, mood: "bad", energy: 45 },
    { id: 37, date: new Date(today.getTime() - 65 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 2, pain: 2, mood: "neutral", energy: 55 },
    { id: 38, date: new Date(today.getTime() - 68 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 80 },
    { id: 39, date: new Date(today.getTime() - 72 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 1, mood: "neutral", energy: 70 },
    { id: 40, date: new Date(today.getTime() - 75 * 24 * 60 * 60 * 1000).toISOString(), bleeding: 0, pain: 0, mood: "good", energy: 85 },
  ];
}

export function useSymptomLogs() {
  const [logs, setLogs] = useLocalStorage("symptomLogs", [] as any[]);

  // If logs are empty or have very few entries, populate with mock data
  if (logs.length < 5) {
    const mockLogs = generateMockSymptomLogs();
    // Set the logs immediately
    setTimeout(() => setLogs(mockLogs), 0);
    return [mockLogs, setLogs] as const;
  }

  return [logs, setLogs] as const;
}
