import { useEffect, useState } from "react";
import "./DashBoard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [growth, setGrowth] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      // Redirect if not logged in
      window.location.href = "/login";
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user tasks
        const taskRes = await fetch(`http://demo-ut0u.onrender.com/api/tasks/${username}`);
        const taskData = await taskRes.json();
        setTasks(taskData);

        // Fetch user growth (study hours)
        const growthRes = await fetch(`http://demo-ut0u.onrender.com/api/growth/${username}`);
        const growthData = await growthRes.json();
        setGrowth(growthData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  if (loading) return <p>Loading your dashboard...</p>;

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalHours = growth?.totalStudyHours || 0; // get total hours from growth API

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome back, {username} 👋</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Study Hours</h3>
          <p>{totalHours}</p>
        </div>
      </div>

      <div className="task-list">
        <h3>Your Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> — {task.completed ? "✅ Done" : "⏳ Pending"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
