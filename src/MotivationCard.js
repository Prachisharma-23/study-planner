import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import "./MotivationCard.css";

export default function MotivationCard() {
  const [quote, setQuote] = useState(""); // start empty

  const fetchQuote = () => {
    axios
      .get("http://localhost:8080/api/quotes/random") // Spring Boot API
      .then((res) => setQuote(res.data.text))
      .catch(() => setQuote("⚠️ Unable to fetch quote"));
  };

  return (
    <Card className="motivation-card">
      <CardContent>
        <Typography className="motivation-title" gutterBottom>
          Motivation
        </Typography>

        {/* Show quote if available, otherwise keep space */}
        <Typography variant="body2" component="p" sx={{ minHeight: "40px" }}>
          {quote || "Your motivational quote will appear here."}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={fetchQuote}>
          Get Quote
        </Button>
      </CardActions>
    </Card>
  );
}
