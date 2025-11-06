import { useState } from "react";
import {
  Card,
  Form,
  Button,
  InputGroup,
  ListGroup,
  Badge,
} from "react-bootstrap";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Create todo timer app", completed: false },
    { id: 2, text: "Add timer functionality", completed: false },
    { id: 3, text: "Deploy to GitHub Pages", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

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

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <h2>✅ Todo List</h2>
        </Card.Title>

        <Form onSubmit={handleAddTodo} className="mb-3">
          <InputGroup>
            <Form.Control
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
            />
            <Button variant="primary" type="submit">
              ➕ Add
            </Button>
          </InputGroup>
        </Form>

        <ListGroup
          variant="flush"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {todos.length === 0 ? (
            <div className="text-center text-muted py-4">
              <p className="fst-italic">No tasks yet. Add one above! 🎯</p>
            </div>
          ) : (
            todos.map((todo) => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex align-items-center gap-2"
                style={{
                  opacity: todo.completed ? 0.6 : 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <Form.Check
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span className="flex-grow-1">{todo.text}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo.id)}
                  aria-label="Delete todo"
                >
                  🗑️
                </Button>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>

        <div className="text-center mt-3 pt-3 border-top">
          <Badge bg="secondary">
            {todos.filter((t) => !t.completed).length} of {todos.length} tasks
            remaining
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TodoList;
