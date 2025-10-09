import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import GrowthCard from "./GrowthCard";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Login from "./Login";
import MotivationCard from "./MotivationCard";
import Navbar from "./Navbar";
import Signup from "./Signup";
import TaskCard from "./TaskCard";
import TaskListPage from "./TaskListPage";
import TimerCard from "./TimerCard";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="page-content">
                  <HeroSection />
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/add-task"
              element={
                <div className="page-content">
                  <TaskCard onTaskAdded={() => {}} />
                </div>
              }
            />
            <Route
              path="/tasks"
              element={
                <div className="page-content">
                  <TaskListPage />
                </div>
              }
            />
            <Route
              path="/timer"
              element={
                <div className="page-content">
                  <TimerCard />
                </div>
              }
            />
            <Route
              path="/growth"
              element={
                <div className="page-content">
                  <GrowthCard />
                </div>
              }
            />
            <Route
              path="/motivation"
              element={
                <div className="page-content">
                  <MotivationCard />
                </div>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
