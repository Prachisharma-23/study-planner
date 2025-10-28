import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskListPage.css";

export default function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    return () => {
      // cleanup timeout on unmount
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchTasks = () => {
    const username =localStorage.getItem("username");
    if (!username) {
      console.error("No username found in localStorage");
      return;
    }
    axios
      .get(`https://demo-ut0u.onrender.com/api/tasks/${username}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  // showCheerMessage is DEFINITELY used below in markComplete
  const showCheerMessage = () => {
    setMessage("🎉 Hurray! You completed the task!");

    // looped bursts for better visibility
    const duration = 1500; // ms
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 7,
        spread: 70,
        startVelocity: 30,
        origin: { y: 0.6 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // hide message after 3 seconds
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(""), 3000);
  };

  const markComplete = (taskId) => {
    axios
      .put(`http://localhost:8080/api/tasks/${taskId}/complete`)
      .then(() => {
        fetchTasks();
        showCheerMessage(); // <-- call it here so it's used
      })
      .catch((error) => console.error("Error marking task complete:", error));
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:8080/api/tasks/${taskId}`)
      .then(() => fetchTasks())
      .catch((error) => console.error("Error deleting task:", error));
  };

  const pending = tasks.filter((t) => !t.completed).length;

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
                  <span>
                    {task.completed ? "✅" : "⏳"} {task.title} | 📅{" "}
                    {task.deadline ? task.deadline : "—"} |{" "}
                    {task.priority === "High"
                      ? "⚡ High"
                      : task.priority === "Med"
                      ? "🟡 Med"
                      : "🟢 Low"}
                  </span>

                  <div style={{ display: "flex", gap: "8px" }}>
                    {!task.completed && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => markComplete(task.id)}
                      >
                        Mark Done
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteTask(task.id)}
                    >
                      🗑
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

          <Typography style={{ marginTop: "15px" }}>
            You have {pending} tasks pending.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

