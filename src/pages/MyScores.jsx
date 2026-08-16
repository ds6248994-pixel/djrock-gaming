import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function MyScores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ================================
  // LOAD MY SCORES
  // ================================
  async function loadScores() {
    try {
      setLoading(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage("Please login first.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/scores",
        {
          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "My Scores Error:",
          result
        );

        setMessage(
          result.error ||
            "Scores load नहीं हो पाए।"
        );

        return;
      }

      setScores(result.scores || []);

    } catch (error) {
      console.error(
        "Load My Scores Error:",
        error
      );

      setMessage(
        "Scores load नहीं हो पाए।"
      );

    } finally {
      setLoading(false);
    }
  }

  // ================================
  // LOAD ON PAGE OPEN
  // ================================
  useEffect(() => {
    loadScores();
  }, []);

  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>
          📊 My Scores
        </h1>

        <p className="profile-subtitle">
          Your gaming score history
        </p>

        {loading ? (
          <p>
            Loading scores...
          </p>
        ) : message ? (
          <p className="profile-message">
            {message}
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

                <div>
                  🎮 Game ID:{" "}
                  <strong>
                    {item.game_id}
                  </strong>
                </div>

                <div>
                  🏆 Score:{" "}
                  <strong>
                    {item.score}
                  </strong>
                </div>

                <div>
                  📅{" "}
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyScores;