import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./GrowthCard.css";

export default function GrowthCard() {
  const [growth, setGrowth] = useState(null);
  const [quote, setQuote] = useState("");

  const fetchProgress = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/growth");
      setGrowth(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const quotes = [
    "Small steps every day lead to big results 🚀",
    "Consistency beats intensity ✨",
    "Don’t watch the clock, do what it does — keep going ⏳",
    "Your future self will thank you 💡",
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  // Pie chart data
  const pieData = growth
    ? [
        { name: "Completed Tasks", value: growth.completedTasks },
        { name: "Remaining Tasks", value: growth.totalTasks - growth.completedTasks },
      ]
    : [];

  const COLORS = ["#4caf50", "#e0e0e0"]; // Green for completed, gray for remaining

  return (
    <Card className="growth-card">
      <CardContent>
        <Typography className="growth-title" gutterBottom variant="h6">
          Growth Tracker
        </Typography>

        {growth ? (
          <>
            <Typography variant="body2" gutterBottom>
              ✅ Tasks Completed: {growth.completedTasks}/{growth.totalTasks}
            </Typography>
            <Typography variant="body2" gutterBottom>
              ⏳ Study Hours: {growth.studyHours.toFixed(2)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              🔥 Streak: {growth.streakDays || 0} days
            </Typography>

            <Divider sx={{ marginY: 2 }} />

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </>
        ) : (
          <Typography variant="body2">
            Monitor your progress and keep improving.
          </Typography>
        )}

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          "{quote}"
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" variant="contained" onClick={fetchProgress}>
          View Progress
        </Button>
      </CardActions>
    </Card>
  );
}
