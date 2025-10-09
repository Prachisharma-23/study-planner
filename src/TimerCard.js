import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "./TimerCard.css";

// ⬇️ Import PieChart instead of LinearProgress
import { Cell, Pie, PieChart, Tooltip } from "recharts";

export default function TimerCard() {
  const [status, setStatus] = useState("Idle");
  const [timeLeft, setTimeLeft] = useState(0); // seconds countdown
  const [isRunning, setIsRunning] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setStatus("⏰ Time’s up!");
      alert("🎉 Timer finished!");
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const startTimer = async () => {
    await axios.post("http://localhost:8080/api/timer/start");
    setStatus("Focusing...");
    setTotalTime(focusMinutes * 60);
    setTimeLeft(focusMinutes * 60); 
    setIsRunning(true);
  };

  const startBreak = async () => {
    await axios.post("http://localhost:8080/api/timer/start-break");
    setStatus("On Break...");
    setTotalTime(breakMinutes * 60);
    setTimeLeft(breakMinutes * 60);
    setIsRunning(true);
  };

  const stopTimer = async () => {
    await axios.post("http://localhost:8080/api/timer/stop");
    setIsRunning(false);
    setStatus("Stopped");
  };

  const resetTimer = () => {
    setStatus("Idle");
    setTimeLeft(0);
    setIsRunning(false);
  };

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // progress % calculation
  const progress = totalTime ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  // Data for PieChart (done vs remaining)
  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = ["#4caf50", "#e0e0e0"];

  return (
    <Card className="timer-card">
      <CardContent>
        <Typography className="timer-title" gutterBottom>
          ⏳ Study Timer
        </Typography>

        <div className="time-inputs">
          <TextField
            type="number"
            label="Focus (min)"
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(Number(e.target.value))}
            size="small"
          />
          <TextField
            type="number"
            label="Break (min)"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            size="small"
          />
        </div>

        <Typography variant="h4" className="time-display">
          {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
        </Typography>

        {/* ⬇️ PieChart replaces LinearProgress */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
  <PieChart width={200} height={200}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      paddingAngle={3}
      dataKey="value"
      isAnimationActive={true}
      animationDuration={500}
      animationEasing="ease-out"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>

  {/* Centered % text */}
  <Typography
    variant="h6"
    sx={{
      position: "absolute",
      top: "53%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontWeight: "bold",
    }}
  >
    {Math.round(progress)}%
  </Typography>
</div>


        <Typography
          variant="subtitle1"
          color="textSecondary"
          className="status-text"
        >
          {status}
        </Typography>
      </CardContent>

      <CardActions className="button-group">
        <Button
          size="small"
          variant="contained"
          onClick={startTimer}
          disabled={isRunning}
        >
          Start Focus
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={startBreak}
          disabled={isRunning}
        >
          Start Break
        </Button>
        <Button
          size="small"
          onClick={stopTimer}
          disabled={!isRunning}
          color="error"
        >
          Stop
        </Button>
        <Button size="small" onClick={resetTimer} disabled={isRunning}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}
