import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user) {
        setMessage("Login successful! 🎉");

        setTimeout(() => {
          navigate("/profile");
        }, 500);
      }

    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
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

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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
        <p className="forgot-password">
        <Link to="/forgot-password">
          Forgot Password?
        </Link>
      </p>

      </div>
    </div>
  );
}

export default Login;