import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();

    // ================================
    // VALIDATION
    // ================================
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ================================
      // CREATE SUPABASE AUTH USER
      // ================================
      const { data, error } =
        await supabase.auth.signUp({
          email: email.trim(),
          password: password,

          options: {
            data: {
              name: name.trim(),
            },
          },
        });

      if (error) {
        console.error(
          "Supabase Register Error:",
          error
        );

        setMessage(error.message);
        return;
      }

      if (!data.user) {
        setMessage(
          "Account could not be created."
        );
        return;
      }

      // ================================
      // CREATE PROFILE
      // ================================
      const userId = data.user.id;

      const { error: profileError } =
        await supabase
          .from("profile")
          .insert({
            id: userId,
            username: name.trim(),
            avatar_url: null,
          });

      if (profileError) {
        console.error(
          "Profile Create Error:",
          profileError
        );

        setMessage(
          "Account created, but profile could not be created. Please contact support."
        );

        return;
      }

      // ================================
      // SUCCESS
      // ================================
      setMessage(
        "Account created successfully! 🎉"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      console.error(
        "Register Error:",
        error
      );

      setMessage(
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          <span>Create Account</span>
          <span className="register-icon">
            🎮
          </span>
        </h1>

        <p>
          Join the DJROCK gaming community
        </p>

        <form onSubmit={handleRegister}>

          {/* NAME */}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Create your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          {/* REGISTER */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        {/* MESSAGE */}
        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        {/* LOGIN LINK */}
        <p className="register-login">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;