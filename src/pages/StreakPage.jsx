import { Container } from "react-bootstrap";
import { useStreak } from "../context/StreakContext";
import { generateDateRange, formatDateKey } from "../services/streakService";
import { useMemo, useState, useEffect } from "react";

function StreakPage() {
  const { streakData, currentStreak, longestStreak, totalCompletions } =
    useStreak();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Watch for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(theme === "dark");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Generate 365 days of dates
  const dateRange = useMemo(() => generateDateRange(365), []);

  // Color intensity based on completion count
  const getColor = (count) => {
    if (isDarkMode) {
      if (count === 0) return "#161b22"; // Empty - dark background
      if (count <= 2) return "#0e4429"; // Light intensity
      if (count <= 5) return "#006d32"; // Medium intensity
      return "#26a641"; // Full intensity
    } else {
      if (count === 0) return "#ebedf0"; // Empty - light background
      if (count <= 2) return "#9be9a8"; // Light intensity
      if (count <= 5) return "#40c463"; // Medium intensity
      return "#216e39"; // Full intensity
    }
  };

  // Group dates by week for grid layout
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];

    // Find the first Sunday to start the grid
    const firstDate = dateRange[0].date;
    const firstDayOfWeek = firstDate.getDay(); // 0 = Sunday

    // Add empty cells for days before the first date
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const { date, dateKey } of dateRange) {
      currentWeek.push({ date, dateKey, count: streakData[dateKey] || 0 });

      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add remaining days
    if (currentWeek.length > 0) {
      result.push(currentWeek);
    }

    return result;
  }, [dateRange, streakData]);

  // Get month labels for the grid
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week.find((day) => day !== null);
      if (firstDayOfWeek) {
        const month = firstDayOfWeek.date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            month: firstDayOfWeek.date.toLocaleString("default", {
              month: "short",
            }),
            weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeks]);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cellSize = 12;
  const cellGap = 3;

  return (
    <Container
      fluid
      className="min-vh-100 pb-5"
      style={{ background: "var(--bg-primary)" }}
    >
      <Container className="pt-5">
        {/* Hero Section */}
        <div
          className="text-center mb-4 p-4"
          style={{
            background: "var(--card-bg)",
            borderRadius: "16px",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h1
            className="display-4 fw-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            <span style={{ fontSize: "2.5rem" }}>🔥</span> Focus Streak
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
            Track your daily focus sessions
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className="d-flex justify-content-center gap-4 mb-4 flex-wrap"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "16px",
              padding: "1.5rem 2rem",
              textAlign: "center",
              boxShadow: "var(--card-shadow)",
              minWidth: "140px",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: currentStreak > 0 ? "#f59e0b" : "var(--text-muted)",
              }}
            >
              {currentStreak}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Current Streak
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "16px",
              padding: "1.5rem 2rem",
              textAlign: "center",
              boxShadow: "var(--card-shadow)",
              minWidth: "140px",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: longestStreak > 0 ? "#10b981" : "var(--text-muted)",
              }}
            >
              {longestStreak}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Longest Streak
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              borderRadius: "16px",
              padding: "1.5rem 2rem",
              textAlign: "center",
              boxShadow: "var(--card-shadow)",
              minWidth: "140px",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: totalCompletions > 0 ? "#3b82f6" : "var(--text-muted)",
              }}
            >
              {totalCompletions}
            </div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Total Sessions
            </div>
          </div>
        </div>

        {/* Contribution Calendar */}
        <div
          style={{
            background: "var(--card-bg)",
            borderRadius: "16px",
            padding: "2rem",
            boxShadow: "var(--card-shadow)",
            overflowX: "auto",
          }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "700",
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {totalCompletions} focus sessions in the last year
          </h3>

          <div style={{ display: "flex", gap: "4px" }}>
            {/* Day labels */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${cellGap}px`,
                marginRight: "8px",
                paddingTop: "20px",
              }}
            >
              {dayLabels.map((day, i) => (
                <div
                  key={day}
                  style={{
                    height: `${cellSize}px`,
                    fontSize: "9px",
                    color: "var(--text-muted)",
                    display: i % 2 === 1 ? "flex" : "none", // Show Mon, Wed, Fri
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "24px",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div>
              {/* Month labels */}
              <div
                style={{
                  display: "flex",
                  marginBottom: "4px",
                  height: "16px",
                  position: "relative",
                }}
              >
                {monthLabels.map(({ month, weekIndex }) => (
                  <div
                    key={`${month}-${weekIndex}`}
                    style={{
                      position: "absolute",
                      left: `${weekIndex * (cellSize + cellGap)}px`,
                      fontSize: "9px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {month}
                  </div>
                ))}
              </div>

              {/* Weeks grid */}
              <div style={{ display: "flex", gap: `${cellGap}px` }}>
                {weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: `${cellGap}px`,
                    }}
                  >
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        title={
                          day
                            ? `${day.count} session${
                                day.count !== 1 ? "s" : ""
                              } on ${day.date.toLocaleDateString()}`
                            : ""
                        }
                        style={{
                          width: `${cellSize}px`,
                          height: `${cellSize}px`,
                          borderRadius: "2px",
                          backgroundColor: day
                            ? getColor(day.count)
                            : "transparent",
                          cursor: day ? "pointer" : "default",
                          transition: "transform 0.1s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (day) e.target.style.transform = "scale(1.2)";
                        }}
                        onMouseLeave={(e) => {
                          if (day) e.target.style.transform = "scale(1)";
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "4px",
              marginTop: "1rem",
              fontSize: "10px",
              color: "var(--text-muted)",
            }}
          >
            <span>Less</span>
            {[0, 1, 3, 6].map((count) => (
              <div
                key={count}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  borderRadius: "2px",
                  backgroundColor: getColor(count),
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default StreakPage;
