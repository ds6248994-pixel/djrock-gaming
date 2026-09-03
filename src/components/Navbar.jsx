import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Navbar({ favorites = [], user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout Error:", error);
      return;
    }

    setMenuOpen(false);
    navigate("/login");
  }

  const isLoggedIn = !!user;

  return (
    <header>

      <div className="brand">
        <img
          src={logo}
          alt="DJROCK Logo"
          width="180"
        />
        <h1>DJROCK</h1>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        type="button"
      >
        ☰
      </button>

      <div
        className={`menu ${
          menuOpen ? "menu-open" : ""
        }`}
      >
        <ul>

          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/games"
              onClick={() => setMenuOpen(false)}
            >
              Games
            </Link>
          </li>

          

          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
            >
              ❤️ Favorites
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
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

        <p>
          ❤️ Favorites: {favorites.length}
        </p>

        

       </div>

    </header>
  );
}

export default Navbar;