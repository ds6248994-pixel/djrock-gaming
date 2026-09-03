import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo:
              `${window.location.origin}/reset-password`,
          }
        );

      if (error) {
        console.error(
          "Password Reset Error:",
          error
        );

        setMessage(error.message);
        return;
      }

      setMessage(
        "Password reset link sent! 📧 Check your email."
      );

    } catch (error) {
      console.error(
        "Forgot Password Error:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          🔐 Forgot Password
        </h1>

        <p>
          Enter your registered email address.
        </p>

        <form onSubmit={handleReset}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="register-login">
          Remember your password?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;