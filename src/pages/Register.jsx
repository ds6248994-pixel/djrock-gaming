import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

   const user = {
       name: name,
       email: email,
       password: password,
       memberSince: new Date().getFullYear(),
};

    localStorage.setItem("djrockUser", JSON.stringify(user));

    setMessage("Account created successfully! 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>
          <span>Create Account</span>
          <span className="register-icon">🎮</span>
        </h1>

        <p>Join the DJROCK gaming community</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            Register
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="register-login">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;