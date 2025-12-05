import { useState } from "react";
import { FiTrash2, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { useTodo } from "../context/TodoContext";

function TodoList() {
  const {
    todos,
    activeTodos,
    completedTodos,
    completedCount,
    totalCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  } = useTodo();

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

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
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    toggleTodo(id);
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleEditClick = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      editTodo(editingId, editText);
      setEditingId(null);
      setEditText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div
      style={{
        border: "none",
        background: "var(--card-bg)",
        borderRadius: "20px",
        boxShadow: "var(--card-shadow)",
        padding: "2.5rem",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        color: "var(--text-primary)",
      }}
    >
      <style>
        {`
          button:focus {
            outline: none !important;
          }
        `}
      </style>
      {/* Header */}
      <div
        className="text-center mb-4"
        style={{
          padding: "10px 20px",
          background: "var(--input-bg)",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: "700",
            color: "var(--text-secondary)",
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
              padding: "14px 18px",
              fontSize: "1.15rem",
              border: "2px solid var(--border-color)",
              borderRadius: "12px",
              outline: "none",
              transition: "all 0.2s ease",
              fontWeight: "500",
              color: "var(--text-primary)",
              background: "var(--input-bg)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-blue)";
              e.target.style.background = "var(--input-focus)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border-color)";
              e.target.style.background = "var(--input-bg)";
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 28px",
              fontSize: "1rem",
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
          background: "var(--input-bg)",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            fontSize: "0.9rem",
            fontWeight: "700",
            color:
              totalCount > 0 && completedCount === totalCount
                ? "var(--text-primary)"
                : "var(--text-secondary)",
            letterSpacing: "0.5px",
            background:
              totalCount > 0 && completedCount === totalCount
                ? "var(--accent-yellow)"
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
              background: "var(--input-bg)",
              borderRadius: "15px",
              border: "2px dashed var(--border-color)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📋</div>
            <p
              style={{
                color: "var(--text-muted)",
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
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    color: "var(--text-muted)",
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
                        background: "var(--input-bg)",
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
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={handleEditKeyPress}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            fontSize: "1.1rem",
                            border: "2px solid var(--accent-blue)",
                            borderRadius: "8px",
                            outline: "none",
                            fontWeight: "500",
                            color: "var(--text-primary)",
                            background: "var(--input-focus)",
                          }}
                          autoFocus
                        />
                      ) : (
                        <span
                          style={{
                            flex: 1,
                            color: "var(--text-primary)",
                            fontWeight: "500",
                            fontSize: "1.2rem",
                          }}
                        >
                          {todo.text}
                        </span>
                      )}
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            aria-label="Save edit"
                            style={{
                              width: "32px",
                              height: "32px",
                              border: "none",
                              borderRadius: "8px",
                              background: COLORS.blue,
                              color: "white",
                              fontSize: "1.1rem",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = "#0066cc";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = COLORS.blue;
                            }}
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            aria-label="Cancel edit"
                            style={{
                              width: "32px",
                              height: "32px",
                              border: "none",
                              borderRadius: "8px",
                              background: "var(--input-bg)",
                              color: COLORS.red,
                              fontSize: "1.1rem",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = COLORS.red;
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = "var(--input-bg)";
                              e.target.style.color = COLORS.red;
                            }}
                          >
                            <FiX />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditClick(todo.id, todo.text)}
                          aria-label="Edit todo"
                          style={{
                            width: "32px",
                            height: "32px",
                            border: "none",
                            borderRadius: "8px",
                            background: "var(--input-bg)",
                            color: "var(--text-muted)",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "var(--text-muted)";
                            e.target.style.color = "var(--card-bg)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "var(--input-bg)";
                            e.target.style.color = "var(--text-muted)";
                          }}
                        >
                          <FiEdit2 />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        aria-label="Delete todo"
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "none",
                          borderRadius: "8px",
                          background: "var(--input-bg)",
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
                          e.target.style.background = "var(--input-bg)";
                          e.target.style.color = COLORS.red;
                        }}
                      >
                        <FiTrash2 />
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
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    color: "var(--text-muted)",
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
                        background: "var(--input-bg)",
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
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={handleEditKeyPress}
                          style={{
                            flex: 1,
                            padding: "8px 12px",
                            fontSize: "1.05rem",
                            border: "2px solid var(--accent-blue)",
                            borderRadius: "8px",
                            outline: "none",
                            fontWeight: "400",
                            color: "var(--text-secondary)",
                            background: "var(--input-focus)",
                          }}
                          autoFocus
                        />
                      ) : (
                        <span
                          style={{
                            flex: 1,
                            textDecoration: "line-through",
                            color: "var(--text-secondary)",
                            fontWeight: "400",
                            fontSize: "1.05rem",
                          }}
                        >
                          {todo.text}
                        </span>
                      )}
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            aria-label="Save edit"
                            style={{
                              width: "32px",
                              height: "32px",
                              border: "none",
                              borderRadius: "8px",
                              background: COLORS.blue,
                              color: "white",
                              fontSize: "1.1rem",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = "#0066cc";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = COLORS.blue;
                            }}
                          >
                            <FiCheck />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            aria-label="Cancel edit"
                            style={{
                              width: "32px",
                              height: "32px",
                              border: "none",
                              borderRadius: "8px",
                              background: "var(--input-bg)",
                              color: COLORS.red,
                              fontSize: "1.1rem",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = COLORS.red;
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = "var(--input-bg)";
                              e.target.style.color = COLORS.red;
                            }}
                          >
                            <FiX />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditClick(todo.id, todo.text)}
                          aria-label="Edit todo"
                          style={{
                            width: "32px",
                            height: "32px",
                            border: "none",
                            borderRadius: "8px",
                            background: "var(--input-bg)",
                            color: "var(--text-muted)",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            outline: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "var(--text-muted)";
                            e.target.style.color = "var(--card-bg)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "var(--input-bg)";
                            e.target.style.color = "var(--text-muted)";
                          }}
                        >
                          <FiEdit2 />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        aria-label="Delete todo"
                        style={{
                          width: "32px",
                          height: "32px",
                          border: "none",
                          borderRadius: "8px",
                          background: "var(--input-bg)",
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
                          e.target.style.background = "var(--input-bg)";
                          e.target.style.color = COLORS.red;
                        }}
                      >
                        <FiTrash2 />
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
