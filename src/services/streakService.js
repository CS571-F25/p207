/**
 * Streak Service - Persistence abstraction layer
 * Currently uses localStorage, can be swapped for Firebase/Supabase later
 * Data structure: { "YYYY-MM-DD": completionCount, ... }
 */

const STORAGE_KEY = "streakData";

/**
 * Formats a Date object to YYYY-MM-DD string
 * @param {Date} date
 * @returns {string}
 */
export function formatDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Loads streak data from localStorage
 * @returns {Object} Streak data object { "YYYY-MM-DD": count }
 */
export function loadStreakData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load streak data:", error);
  }
  return {};
}

/**
 * Saves streak data to localStorage
 * @param {Object} data Streak data object { "YYYY-MM-DD": count }
 */
export function saveStreakData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save streak data:", error);
  }
}

/**
 * Increments completion count for today
 * @param {Object} currentData Current streak data
 * @returns {Object} Updated streak data
 */
export function incrementTodayCompletion(currentData) {
  const today = formatDateKey();
  const newData = { ...currentData };
  newData[today] = (newData[today] || 0) + 1;
  return newData;
}

/**
 * Calculates current streak (consecutive days with completions)
 * @param {Object} data Streak data
 * @returns {number} Current streak count
 */
export function calculateCurrentStreak(data) {
  let streak = 0;
  const today = new Date();

  // Start from today and go backwards
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = formatDateKey(date);

    if (data[dateKey] && data[dateKey] > 0) {
      streak++;
    } else if (i === 0) {
      // Today has no completions yet, that's okay - check yesterday
      continue;
    } else {
      // Streak broken
      break;
    }
  }

  return streak;
}

/**
 * Calculates longest streak ever
 * @param {Object} data Streak data
 * @returns {number} Longest streak count
 */
export function calculateLongestStreak(data) {
  const dates = Object.keys(data).sort();
  if (dates.length === 0) return 0;

  let longestStreak = 0;
  let currentStreak = 0;
  let prevDate = null;

  for (const dateStr of dates) {
    if (data[dateStr] <= 0) continue;

    const currentDate = new Date(dateStr);

    if (prevDate) {
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);
    prevDate = currentDate;
  }

  return longestStreak;
}

/**
 * Gets total completions count
 * @param {Object} data Streak data
 * @returns {number} Total completions
 */
export function getTotalCompletions(data) {
  return Object.values(data).reduce((sum, count) => sum + count, 0);
}

/**
 * Generates array of dates for last N days
 * @param {number} days Number of days to generate
 * @returns {Array} Array of { date: Date, dateKey: string }
 */
export function generateDateRange(days = 365) {
  const dates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push({
      date,
      dateKey: formatDateKey(date),
    });
  }

  return dates;
}
