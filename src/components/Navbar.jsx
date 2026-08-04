import logo from "../assets/logo.png";

function Navbar({ favorites }) {
  return (
    <header>
      <div className="brand">
        <img src={logo} alt="DJROCK Logo" width="180" />
        <h1>DJROCK</h1>
      </div>
        

      <div className="menu">
        <ul>
          <li>Home</li>
          <li>Games</li>
          <li>Videos</li>
          <li>Contact</li>
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