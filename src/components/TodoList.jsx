import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Create todo timer app", completed: false },
    { id: 2, text: "Add timer functionality", completed: false },
    { id: 3, text: "Deploy to GitHub Pages", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Custom color palette (matching Timer)
  const COLORS = {
    blue: "#8CE4FF",
    yellow: "#FEEE91",
    orange: "#FFA239",
    red: "#FF5656",
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div
      style={{
        border: "none",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        padding: "2rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="text-center mb-4"
        style={{
          padding: "10px 20px",
          background: "#f5f5f5",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: "700",
            color: "#666",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Task Manager
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTodo} className="mb-4">
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            style={{
              flex: 1,
              padding: "12px 16px",
              fontSize: "0.9rem",
              border: "2px solid #f5f5f5",
              borderRadius: "12px",
              outline: "none",
              transition: "all 0.2s ease",
              fontWeight: "500",
              color: "#333",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = COLORS.blue;
              e.target.style.background = "#fafafa";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#f5f5f5";
              e.target.style.background = "white";
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 24px",
              fontSize: "0.75rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              background: COLORS.blue,
              border: "none",
              borderRadius: "12px",
              color: "#333",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 4px 12px ${COLORS.blue}40`,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = `0 6px 20px ${COLORS.blue}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = `0 4px 12px ${COLORS.blue}40`;
            }}
          >
            + Add
          </button>
        </div>
      </form>

      {/* Progress Badge */}
      <div
        className="mb-3 text-center"
        style={{
          padding: "8px 16px",
          background: "#f5f5f5",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color:
              totalCount > 0 && completedCount === totalCount ? "#333" : "#666",
            letterSpacing: "0.5px",
            background:
              totalCount > 0 && completedCount === totalCount
                ? COLORS.yellow
                : "transparent",
            padding:
              totalCount > 0 && completedCount === totalCount
                ? "4px 12px"
                : "0",
            borderRadius: "8px",
            display: "inline-block",
            transition: "all 0.3s ease",
          }}
        >
          {completedCount} of {totalCount} tasks completed
          {totalCount > 0 && completedCount === totalCount && " 🎉"}
        </div>
      </div>

      {/* Task List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingRight: "8px",
          marginBottom: "1rem",
        }}
      >
        {/* Active Tasks */}
        {activeTodos.length === 0 && completedTodos.length === 0 ? (
          <div
            className="text-center py-5"
            style={{
              background: "#f5f5f5",
              borderRadius: "15px",
              border: "2px dashed #ddd",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📋</div>
            <p
              style={{
                color: "#999",
                fontWeight: "500",
                margin: 0,
                fontSize: "0.85rem",
              }}
            >
              No tasks yet. Add your first task above!
            </p>
          </div>
        ) : (
          <>
            {/* Active Tasks Section */}
            {activeTodos.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    color: "#999",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    paddingLeft: "4px",
                  }}
                >
                  Active Tasks ({activeTodos.length})
                </div>
                <div>
                  {activeTodos.map((todo) => (
                    <div
                      key={todo.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        marginBottom: "8px",
                        background: "#f5f5f5",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleToggleTodo(todo.id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: COLORS.blue,
                        }}
                      />
                      <span
                        style={{
                          flex: 1,
                          color: "#333",
                          fontWeight: "500",
                          fontSize: "0.9rem",
                        }}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        aria-label="Delete todo"
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "none",
                          borderRadius: "8px",
                          background: "white",
                          color: COLORS.red,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontWeight: "300",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = COLORS.red;
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "white";
                          e.target.style.color = COLORS.red;
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks Section */}
            {completedTodos.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: "700",
                    color: "#999",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    paddingLeft: "4px",
                  }}
                >
                  Completed ({completedTodos.length})
                </div>
                <div>
                  {completedTodos.map((todo) => (
                    <div
                      key={todo.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        marginBottom: "8px",
                        background: COLORS.yellow,
                        borderRadius: "12px",
                        opacity: 0.7,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => handleToggleTodo(todo.id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: COLORS.blue,
                        }}
                      />
                      <span
                        style={{
                          flex: 1,
                          textDecoration: "line-through",
                          color: "#666",
                          fontWeight: "400",
                          fontSize: "0.9rem",
                        }}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        aria-label="Delete todo"
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "none",
                          borderRadius: "8px",
                          background: "white",
                          color: COLORS.red,
                          fontSize: "1.2rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          fontWeight: "300",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = COLORS.red;
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "white";
                          e.target.style.color = COLORS.red;
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TodoList;
