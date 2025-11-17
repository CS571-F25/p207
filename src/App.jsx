import { Container, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, NavLink } from "react-router";
import Home from "./pages/Home";
import TimerPage from "./pages/TimerPage";
import TodoPage from "./pages/TodoPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar
        expand="lg"
        style={{
          background:
            "linear-gradient(135deg, #06B6D4 0%, #14B8A6 50%, #10B981 100%)",
        }}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: "bold" }}>
            <span style={{ fontSize: "1.5rem" }}>⏰</span> Todo Timer App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                style={{
                  fontWeight: "bold",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  margin: "0 5px",
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/timer"
                style={{
                  fontWeight: "bold",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  margin: "0 5px",
                }}
              >
                Timer
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/todo"
                style={{
                  fontWeight: "bold",
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  margin: "0 5px",
                }}
              >
                Todo List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </>
  );
}

export default App;
