import { useAppData } from "../context/AppDataContext";
import type { CycleData, SymptomLog, UserProfile } from "../lib/data";

type Setter<T> = T | ((value: T) => T);

function useTupleSetter<T>(value: T, setter: (nextValue: Setter<T>) => Promise<void>) {
  return [value, setter] as const;
}

export function useUserProfile() {
  const { profile, setProfile } = useAppData();
  return useTupleSetter<UserProfile>(profile, setProfile);
}

export function useCycleData() {
  const { cycleData, setCycleData } = useAppData();
  return useTupleSetter<CycleData>(cycleData, setCycleData);
}

export function useSymptomLogs() {
  const { symptomLogs, setSymptomLogs } = useAppData();
  return useTupleSetter<SymptomLog[]>(symptomLogs, setSymptomLogs);
}

export function useAppDataStatus() {
  const { isLoaded } = useAppData();
  return isLoaded;
}

export function shouldShowPhaseByDefault(profile: any) {
  const isNotTrans = profile.isTrans !== "yes";
  const isReproductiveAge = profile.lifeStage === "reproductive-age";
  const estrogenBasedContraceptives = [
    "pill",
    "iud-hormonal",
    "patch",
    "ring",
    "shot",
  ];
  const usesEstrogenContraceptive = profile.contraceptives?.some((c: string) =>
    estrogenBasedContraceptives.includes(c),
  );

  return isNotTrans && isReproductiveAge && !usesEstrogenContraceptive;
}
