import { Container, Row, Col } from 'react-bootstrap'
import Timer from './components/Timer'
import TodoList from './components/TodoList'

function App() {
  return (
    <Container fluid className="min-vh-100 bg-light py-4">
      <Container>
        <div className="text-center mb-5 p-4 bg-primary text-white rounded shadow">
          <h1 className="display-4 fw-bold">📝 Todo Timer App</h1>
          <p className="lead mb-0">Manage your tasks with timers</p>
        </div>
        
        <Row className="g-4">
          <Col md={6}>
            <Timer />
          </Col>
          <Col md={6}>
            <TodoList />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App
