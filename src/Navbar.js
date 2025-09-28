import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item">Home</NavLink>
      <NavLink to="/add-task" className="nav-item">Add Task</NavLink>
      <NavLink to="/tasks" className="nav-item">All Tasks</NavLink>
      <NavLink to="/timer" className="nav-item">Timer</NavLink>
      <NavLink to="/growth" className="nav-item">Growth</NavLink>
      <NavLink to="/motivation" className="nav-item">Motivation</NavLink>
    </nav>
  );
}


