import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import axios from "axios";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskListPage.css";

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const markComplete = (taskId) => {
    axios
      .put(`http://localhost:8080/api/tasks/${taskId}/complete`)
      .then(() => {
        fetchTasks();
        showCheerMessage();
      })
      .catch((error) => console.error("Error marking task complete:", error));
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:8080/api/tasks/${taskId}`)
      .then(() => fetchTasks())
      .catch((error) => console.error("Error deleting task:", error));
  };

  const showCheerMessage = () => {
    setMessage("🎉 Hurray! You completed the task!");
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <Button
        variant="outlined"
        color="secondary"
        style={{ marginBottom: "10px" }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {message && <div className="cheer-message">{message}</div>}

      <Card>
        <CardContent>
          <Typography variant="h6">All Tasks</Typography>
          <List>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <ListItem
                  key={task.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <span>{task.title}</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {!task.completed && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => markComplete(task.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No tasks yet.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
