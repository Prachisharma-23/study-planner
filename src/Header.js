import './Header.css';
import logo from "./logo.png";

function Header(){
    return(
        <header>
             <img src={logo} alt="App Logo" className="logo" />
            <h1>Study Planner</h1>

        </header>
    );
}
export default Header;