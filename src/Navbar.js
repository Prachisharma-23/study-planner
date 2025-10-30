import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Study Planner</div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className="nav-item" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/dashboard" className="nav-item" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
        <NavLink to="/add-task" className="nav-item" onClick={() => setMenuOpen(false)}>Add Task</NavLink>
        <NavLink to="/tasks" className="nav-item" onClick={() => setMenuOpen(false)}>All Tasks</NavLink>
        <NavLink to="/timer" className="nav-item" onClick={() => setMenuOpen(false)}>Timer</NavLink>
        <NavLink to="/growth" className="nav-item" onClick={() => setMenuOpen(false)}>Growth</NavLink>
        <NavLink to="/motivation" className="nav-item" onClick={() => setMenuOpen(false)}>Motivation</NavLink>
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
}


