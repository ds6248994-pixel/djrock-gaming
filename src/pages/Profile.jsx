import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import API_URL from "../lib/api";

function Profile() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(
    localStorage.getItem("djrockUser")
  );

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(
    savedUser?.name || ""
  );

  const [email, setEmail] = useState(
    savedUser?.email || ""
  );

  // ================================
  // MY SCORES
  // ================================
  const [scores, setScores] = useState([]);
  const [scoresLoading, setScoresLoading] = useState(true);
  const [scoresError, setScoresError] = useState("");

  // ================================
  // LOAD MY SCORES
  // ================================
  async function loadScores() {
    try {
      setScoresLoading(true);
      setScoresError("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setScoresError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/scores`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "Get Scores Error:",
          result
        );

        setScoresError(
          result.error ||
            "Scores load नहीं हो पाए।"
        );

        return;
      }

      setScores(result.scores || []);

    } catch (error) {
      console.error(
        "Load Scores Error:",
        error
      );

      setScoresError(
        "Scores load नहीं हो पाए।"
      );

    } finally {
      setScoresLoading(false);
    }
  }

  // ================================
  // LOAD SCORES ON PROFILE OPEN
  // ================================
  useEffect(() => {
    loadScores();
  }, []);

  // ================================
  // SAVE PROFILE
  // ================================
  function handleSave() {
    const updatedUser = {
      ...savedUser,
      name: name,
      email: email,
    };

    localStorage.setItem(
      "djrockUser",
      JSON.stringify(updatedUser)
    );

    setIsEditing(false);
  }

  // ================================
  // LOGOUT
  // ================================
  function handleLogout() {
    localStorage.removeItem(
      "djrockLoggedIn"
    );

    navigate("/login");
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h1>My Profile</h1>

        <p className="profile-subtitle">
          Welcome to your DJROCK profile
        </p>

        {/* ================================
            PROFILE INFORMATION
        ================================ */}

        <div className="profile-info">

          <div>
            <strong>Name</strong>

            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            ) : (
              <p>{name}</p>
            )}
          </div>

          <div>
            <strong>Email</strong>

            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            ) : (
              <p>{email}</p>
            )}
          </div>

          <div>
            <strong>Member Since</strong>

            <p>
              {savedUser?.memberSince || "2026"}
            </p>
          </div>

        </div>

        {/* ================================
            MY SCORES
        ================================ */}

        <div className="profile-scores">

          <h2>
            🏆 My Scores
          </h2>

          {scoresLoading ? (
            <p>
              Loading scores...
            </p>
          ) : scoresError ? (
            <p className="profile-message">
              {scoresError}
            </p>
          ) : scores.length === 0 ? (
            <p>
              अभी कोई score नहीं है।
            </p>
          ) : (
            <div className="scores-list">

              {scores.map((item) => (
                <div
                  key={item.id}
                  className="score-item"
                >
                  <span>
                    🎮 Game ID:{" "}
                    <strong>
                      {item.game_id}
                    </strong>
                  </span>

                  <span>
                    🏆 Score:{" "}
                    <strong>
                      {item.score}
                    </strong>
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* ================================
            PROFILE ACTIONS
        ================================ */}

        <div className="profile-actions">

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
              >
                💾 Save
              </button>

              <button
                type="button"
                onClick={() =>
                  setIsEditing(false)
                }
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() =>
                setIsEditing(true)
              }
            >
              ✏️ Edit Profile
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;