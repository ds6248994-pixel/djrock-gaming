import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar({ favorites }) {
  return (
    <header>
      <div className="brand">
        <img src={logo} alt="DJROCK Logo" width="180" />
        <h1>DJROCK</h1>
      </div>
        

      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>Vidoes</li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul> 
      </div>

      <div className="actions">
        <p>❤️ Favorites: {favorites.length}</p>
        
        <button>Play Game</button>
      </div>
    </header>
  );
}

export default Navbar;