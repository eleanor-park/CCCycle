import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchInitialData, saveCycleData, saveProfile, saveSymptomLogs } from "../lib/api";
import {
  defaultCycleData,
  defaultUserProfile,
  type CycleData,
  type SymptomLog,
  type UserProfile,
} from "../lib/data";

type Setter<T> = T | ((previous: T) => T);

interface AppDataContextValue {
  profile: UserProfile;
  cycleData: CycleData;
  symptomLogs: SymptomLog[];
  isLoaded: boolean;
  setProfile: (value: Setter<UserProfile>) => Promise<void>;
  setCycleData: (value: Setter<CycleData>) => Promise<void>;
  setSymptomLogs: (value: Setter<SymptomLog[]>) => Promise<void>;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

function resolveValue<T>(value: Setter<T>, previous: T) {
  return value instanceof Function ? value(previous) : value;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState(defaultUserProfile);
  const [cycleData, setCycleDataState] = useState(defaultCycleData);
  const [symptomLogs, setSymptomLogsState] = useState<SymptomLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    fetchInitialData().then((data) => {
      if (!active) return;
      setProfileState(data.profile);
      setCycleDataState(data.cycleData);
      setSymptomLogsState(data.symptomLogs);
      setIsLoaded(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const setProfile = async (value: Setter<UserProfile>) => {
    const nextValue = resolveValue(value, profile);
    setProfileState(nextValue);
    try {
      await saveProfile(nextValue);
    } catch (error) {
      console.error("Unable to save profile", error);
    }
  };

  const setCycleData = async (value: Setter<CycleData>) => {
    const nextValue = resolveValue(value, cycleData);
    setCycleDataState(nextValue);
    try {
      await saveCycleData(nextValue);
    } catch (error) {
      console.error("Unable to save cycle data", error);
    }
  };

  const setSymptomLogs = async (value: Setter<SymptomLog[]>) => {
    const nextValue = resolveValue(value, symptomLogs);
    setSymptomLogsState(nextValue);
    try {
      await saveSymptomLogs(nextValue);
    } catch (error) {
      console.error("Unable to save symptom logs", error);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        profile,
        cycleData,
        symptomLogs,
        isLoaded,
        setProfile,
        setCycleData,
        setSymptomLogs,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }

  return context;
}
