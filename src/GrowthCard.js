import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import "./GrowthCard.css";

export default function GrowthCard() {
  const [growth, setGrowth] = useState(null);

  const fetchProgress = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/growth");
      setGrowth(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="growth-card">
      <CardContent>
        <Typography className="growth-title" gutterBottom>
          Growth Tracker
        </Typography>

        {growth ? (
          <Typography variant="body2">
            Tasks Completed: {growth.completedTasks}/{growth.totalTasks} <br />
            Study Hours: {growth.studyHours.toFixed(2)} <br />
            Growth: {growth.growthPercent.toFixed(2)}%
          </Typography>
        ) : (
          <Typography variant="body2">Monitor your progress and keep improving.</Typography>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" onClick={fetchProgress}>View Progress</Button>
      </CardActions>
    </Card>
  );
}
