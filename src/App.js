import './App.css';
import Footer from './Footer';
import GrowthCard from './GrowthCard';
import Header from './Header';
import MotivationCard from './MotivationCard';
import Navbar from './Navbar';
import TaskCard from './TaskCard';
import TimerCard from './TimerCard';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <div className='cards'>
      <TaskCard />
      <TimerCard />
      <GrowthCard/>
      <MotivationCard/>
      </div>
      <Footer />
    </div>
  );
}

