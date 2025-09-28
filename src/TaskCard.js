import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./TaskCard.css";

export default function TaskCard({ onTaskAdded }) {
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  // Add a new task to backend
  const addTask = () => {
    if (newTask.trim() === "") return;

    axios
      .post(
        "http://localhost:8080/api/tasks",
        { title: newTask }, // backend will set completed=false
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (onTaskAdded) {
          onTaskAdded(response.data);
        }
        setNewTask("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  return (
    <Card className="task-card">
      <CardContent>
        <Typography className="task-title" gutterBottom>
          Task Manager
        </Typography>

        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={addTask}
          style={{ marginTop: "10px" }}
        >
          Add Task
        </Button>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => navigate("/tasks")}>
          View Tasks
        </Button>
      </CardActions>
    </Card>
  );
}
