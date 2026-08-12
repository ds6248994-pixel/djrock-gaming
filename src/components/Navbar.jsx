import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ favorites = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("djrockLoggedIn") === "true"
  );
  useEffect(() => {
  const checkLogin = () => {
    setIsLoggedIn(
      localStorage.getItem("djrockLoggedIn") === "true"
    );
  };

  window.addEventListener("authChange", checkLogin);

  return () => {
    window.removeEventListener("authChange", checkLogin);
  };
}, []);

  function handleLogout() {
  localStorage.removeItem("djrockLoggedIn");

  window.dispatchEvent(new Event("authChange"));

  setIsLoggedIn(false);
  setMenuOpen(false);
  navigate("/login");
}

  return (
    <header>

      <div className="brand">
        <img src={logo} alt="DJROCK Logo" width="180" />
        <h1>DJROCK</h1>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        ☰
      </button>

      <div className={`menu ${menuOpen ? "menu-open" : ""}`}>
        <ul>

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/games" onClick={() => setMenuOpen(false)}>
              Games
            </Link>
          </li>

          <li>Videos</li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/favorites" onClick={() => setMenuOpen(false)}>
              ❤️ Favorites
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </li>

              <li>
                <button
                  className="nav-logout"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>

      <div className="actions">
        <p>❤️ Favorites: {favorites.length}</p>

        <button type="button">
          Play Game
        </button>
      </div>

    </header>
  );
}

export default Navbar;