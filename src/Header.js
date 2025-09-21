import logo from "./clock.png";
import './Header.css';

function Header(){
    return(
        <header className="header">
             <img src={logo} alt="App Logo" className="logo" />
             <h1 className="title">Study planner</h1>
        </header>
    );
}
export default Header;