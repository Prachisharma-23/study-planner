import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./GrowthCard.css";

export default function GrowthCard() {
    return (
        <Card className="growth-card">
            <CardContent>
                <Typography className="growth-title" gutterBottom>
                    Growth Tracker
                </Typography>
                <Typography variant="body2" component="p">
                    Monitor your progress and keep improving.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View Progress</Button>
            </CardActions>
        </Card>
    );
}
