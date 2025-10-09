import {
  Button, Card, CardActions, CardContent,
  MenuItem, Select,
  TextField, Typography
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    category: "",
    deadline: "",
    priority: "Low",
  });
  const navigate = useNavigate();

  const addTask = () => {
    if (!task.title.trim()) return;
    axios.post("http://localhost:8080/api/tasks", task)
      .then((res) => {
        onTaskAdded && onTaskAdded(res.data);
        setTask({ title: "", category: "", deadline: "", priority: "Low" });
      });
  };

  return (
    <Card style={{ margin: "20px auto", width: "500px" }}>
      <CardContent>
        <Typography variant="h6">Task Manager</Typography>
        <Typography variant="body2" gutterBottom>
          Organize your daily tasks easily ✨
        </Typography>

        <TextField
          label="New Task"
          fullWidth
          margin="dense"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <Select
          fullWidth
          value={task.category}
          displayEmpty
          onChange={(e) => setTask({ ...task, category: e.target.value })}
          style={{ marginTop: "10px" }}
        >
          <MenuItem value="">Category</MenuItem>
          <MenuItem value="Study">Study</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
        </Select>

        <TextField
          type="date"
          fullWidth
          margin="dense"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />

        <Select
          fullWidth
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          style={{ marginTop: "10px" }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Med">Med</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={addTask}
          style={{ marginTop: "15px" }}
        >
          Add Task
        </Button>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => navigate("/tasks")}>View Tasks</Button>
      </CardActions>
    </Card>
  );
}
