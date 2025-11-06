import { useState } from "react";
import { Card, Form, Button, ButtonGroup } from "react-bootstrap";

function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
    // TODO: Implement actual timer logic
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setMinutes(Math.max(0, Math.min(60, value)));
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <h2>⏱️ Timer</h2>
        </Card.Title>

        <div className="text-center mb-4">
          <div
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              color: "#0d6efd",
              fontFamily: "monospace",
            }}
          >
            {String(minutes).padStart(2, "0")}
            <span style={{ opacity: 0.7 }}>:</span>
            {String(seconds).padStart(2, "0")}
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Set Minutes:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="60"
            value={minutes}
            onChange={handleMinutesChange}
            disabled={isRunning}
          />
        </Form.Group>

        <ButtonGroup className="w-100 mb-3">
          <Button
            variant={isRunning ? "warning" : "success"}
            onClick={handleStartStop}
            size="lg"
          >
            {isRunning ? "⏸️ Pause" : "▶️ Start"}
          </Button>
          <Button variant="secondary" onClick={handleReset} size="lg">
            🔄 Reset
          </Button>
        </ButtonGroup>

        <div className="text-center text-muted fst-italic">
          <small>💡 Set your focus time and click Start!</small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Timer;
