import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage(
          "Invalid or expired password reset link."
        );
        return;
      }

      setReady(true);
    }

    checkSession();
  }, []);

  async function handleResetPassword(event) {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setMessage(
        "Please fill both password fields."
      );
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { error } =
        await supabase.auth.updateUser({
          password: password,
        });

      if (error) {
        console.error(
          "Password Update Error:",
          error
        );

        setMessage(error.message);
        return;
      }

      setMessage(
        "Password updated successfully! 🎉"
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);

    } catch (error) {
      console.error(
        "Reset Password Error:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="register-page">
        <div className="register-card">
          <h1>🔐 Reset Password</h1>

          <p>
            {message ||
              "Checking reset link..."}
          </p>

          {message && (
            <Link to="/forgot-password">
              Request New Link
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          🔐 Reset Password
        </h1>

        <p>
          Create a new password for your account.
        </p>

        <form
          onSubmit={handleResetPassword}
        >

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="register-login">
          <Link to="/login">
            Back to Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ResetPassword;