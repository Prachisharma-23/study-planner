import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "./TaskCard.css";

export default function TaskCard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Add a new task to backend
  const addTask = () => {
    if (newTask.trim() === "") return;

    axios
      .post(
        "http://localhost:8080/api/tasks",
        { title: newTask }, // adjust field if backend expects `name` or `taskName`
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setTasks([...tasks, response.data]); // append newly created task
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
        <Typography variant="body2" component="p" gutterBottom>
          Organize and manage your daily tasks effectively.
        </Typography>

        {/* Input field for new task */}
        <TextField
          label="New Task"
          variant="outlined"
          size="small"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        {/* Button to add new task */}
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          style={{ marginTop: "10px" }}
        >
          Add Task
        </Button>

        {/* List of tasks */}
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id}>{task.title}</ListItem>
          ))}
        </List>
      </CardContent>

      <CardActions>
        <Button size="small">View Tasks</Button>
      </CardActions>
    </Card>
  );
}

