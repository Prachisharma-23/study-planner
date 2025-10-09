import { Link } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Plan your path. Make every moment count.</h1>
        <p className="hero-subtitle">
          Organize tasks, track progress, and stay motivated every single day.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/512/external-study-online-education-flaticons-lineal-color-flat-icons.png"
          alt="Study illustration"
        />
      </div>
    </section>
  );
}
