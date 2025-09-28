import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import GrowthCard from "./GrowthCard";
import Header from "./Header";
import HeroSection from "./HeroSection";
import MotivationCard from "./MotivationCard";
import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import TaskListPage from "./TaskListPage";
import TimerCard from "./TimerCard";

export default function App() {
  return (
    <Router>
      <Header />
      <Navbar />

      {/* Define all routes here */}
      <Routes>
         <Route path="/" element={<HeroSection />} />
        <Route path="/add-task" element={<TaskCard onTaskAdded={() => {}} />} /> 
         <Route path="/tasks" element={<TaskListPage />} />
         <Route path="/timer" element={<TimerCard />} />
         <Route path="/growth" element={<GrowthCard />} />
         <Route path="/motivation" element={<MotivationCard />} />
      </Routes>


      {/* Footer should stay common across all pages */}
      <Footer />
    </Router>
  );
}
