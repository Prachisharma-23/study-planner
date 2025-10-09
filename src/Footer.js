import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Footer Links */}
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/add-task">Tasks</Link>
        <Link to="/timer">Timer</Link>
        <Link to="/growth">Growth</Link>
        <Link to="/motivation">Motivation</Link>
      </div>

      {/* Motivational Quote */}
      <div className="footer-quote">
        <p>"Small progress every day adds up to big results."</p>
      </div>

      {/* Contact / About */}
      <div className="footer-bottom">
        <p>© 2025 Study Planner | Built with React & Spring Boot</p>
        <p>
          Made by Prachi Sharma | 
          GitHub: <a href="https://github.com/Prachisharma-23" target="_blank" rel="noopener noreferrer">Prachisharma-23</a> | 
          Email: <a href="mailto:Prachisharmaa2003@gmail.com">Prachisharmaa2003@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
