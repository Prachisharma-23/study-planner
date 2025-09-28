import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "./TimerCard.css";

export default function TimerCard() {
    const [status, setStatus] = useState("Idle");
    const [duration, setDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = async () => {
        await axios.post("http://localhost:8080/api/timer/start");
        setStatus("Running...");
        setDuration(0);
        setIsRunning(true);
    };

    const stopTimer = async () => {
        const res = await axios.post("http://localhost:8080/api/timer/stop");
        setDuration(res.data.duration);
        setStatus("Stopped");
        setIsRunning(false);
    };

    const resetTimer = () => {
        setStatus("Idle");
        setDuration(0);
        setIsRunning(false);
    };

    return (
        <Card className="timer-card">
            <CardContent>
                <Typography className="timer-title" gutterBottom>
                    Timer
                </Typography>
                <Typography variant="h6">
                    {status} ({duration} sec)
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                  size="small" 
                  onClick={startTimer} 
                  disabled={isRunning} // only disable when running
                >
                  Start Timer
                </Button>
                <Button 
                  size="small" 
                  onClick={stopTimer} 
                  disabled={!isRunning} // only enable when running
                >
                  Stop Timer
                </Button>
                <Button 
                  size="small" 
                  onClick={resetTimer}
                  disabled={isRunning} // reset only when stopped
                >
                  Reset
                </Button>
            </CardActions>
        </Card>
    );
}
