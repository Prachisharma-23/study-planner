import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "./MotivationCard.css";

export default function MotivationCard() {
  const [quote, setQuote] = useState("Loading motivational quote...");

  const fetchQuote = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/quotes/random");
      console.log("API response:", res.data); // debug log
      setQuote(res.data.text || "⚠️ No text found in the quote.");
    } catch (err) {
      console.error("Error fetching quote:", err);
      setQuote("⚠️ Unable to fetch quote.");
    }
  };

  // Fetch a quote immediately when component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Card className="motivation-card">
      <CardContent>
        <Typography className="motivation-title" gutterBottom>
          Motivation
        </Typography>

        <Typography variant="body2" component="p" sx={{ minHeight: "40px" }}>
          {quote}
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
