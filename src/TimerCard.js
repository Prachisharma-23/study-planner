import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./TimerCard.css";

export default function TimerCard() {
    return (
        <Card className="timer-card">
            <CardContent>
                <Typography className="timer-title" gutterBottom>
                    Timer
                </Typography>
                <Typography variant="body2" component="p">
                    Track your time and boost productivity.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Start Timer</Button>
            </CardActions>
        </Card>
    );
}
