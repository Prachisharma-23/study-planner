import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./MotivationCard.css";

export default function MotivationCard() {
    return (
        <Card className="motivation-card">
            <CardContent>
                <Typography className="motivation-title" gutterBottom>
                    Motivation
                </Typography>
                <Typography variant="body2" component="p">
                    Stay positive, stay strong, and never give up!
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Get Quote</Button>
            </CardActions>
        </Card>
    );
}
