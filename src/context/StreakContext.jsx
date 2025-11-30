import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  loadStreakData,
  saveStreakData,
  incrementTodayCompletion,
  calculateCurrentStreak,
  calculateLongestStreak,
  getTotalCompletions,
} from "../services/streakService";
import { setOnTimerComplete } from "./TimerContext";

const StreakContext = createContext(null);

export function StreakProvider({ children }) {
  const [streakData, setStreakData] = useState(() => {
    // Load from localStorage on initial mount
    return loadStreakData();
  });

  // Persist to localStorage whenever streak data changes
  useEffect(() => {
    saveStreakData(streakData);
  }, [streakData]);

  // Increment today's completion count
  const incrementCompletion = useCallback(() => {
    setStreakData((prev) => incrementTodayCompletion(prev));
  }, []);

  // Register callback with TimerContext
  useEffect(() => {
    setOnTimerComplete(incrementCompletion);
    return () => setOnTimerComplete(null);
  }, [incrementCompletion]);

  // Derived state
  const currentStreak = calculateCurrentStreak(streakData);
  const longestStreak = calculateLongestStreak(streakData);
  const totalCompletions = getTotalCompletions(streakData);

  const value = {
    // State
    streakData,
    currentStreak,
    longestStreak,
    totalCompletions,
    // Actions
    incrementCompletion,
  };

  return (
    <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
}

export default StreakContext;
