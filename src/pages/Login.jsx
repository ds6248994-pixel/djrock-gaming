import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("djrockUser"));

    if (!savedUser) {
      setMessage("No account found. Please register first.");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem("djrockLoggedIn", "true");
      window.dispatchEvent(new Event("authChange"));

      setMessage("Login successful! 🎉");

    
        navigate("/profile");
          } else {
      setMessage("Invalid email or password.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>
          <span>Welcome Back</span>
          <span className="login-icon">🎮</span>
        </h1>

        <p>Login to your DJROCK account</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        <p className="login-register">
          Don't have any account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;