import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import API_URL from "../lib/api";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ================================
  // LOAD LEADERBOARD
  // ================================
  async function loadLeaderboard() {
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
        `${API_URL}/api/leaderboard`,
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
          "Leaderboard Error:",
          result
        );

        setMessage(
          result.error ||
            "Leaderboard load नहीं हुआ।"
        );

        return;
      }

      setLeaderboard(
        result.leaderboard || []
      );

    } catch (error) {
      console.error(
        "Load Leaderboard Error:",
        error
      );

      setMessage(
        "Leaderboard load नहीं हुआ।"
      );

    } finally {
      setLoading(false);
    }
  }

  // ================================
  // LOAD ON PAGE OPEN
  // ================================
  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>
          🏆 DJROCK Leaderboard
        </h1>

        <p className="profile-subtitle">
          Top players and highest scores
        </p>

        {loading ? (
          <p>
            Loading leaderboard...
          </p>
        ) : message ? (
          <p className="profile-message">
            {message}
          </p>
        ) : leaderboard.length === 0 ? (
          <p>
            अभी leaderboard में कोई score नहीं है।
          </p>
        ) : (
          <div className="leaderboard-list">

            {leaderboard.map((item) => (

              <div
                key={`${item.rank}-${item.game_id}-${item.score}`}
                className={`leaderboard-item ${
                  item.rank <= 3
                    ? "top-player"
                    : ""
                }`}
              >

                <div className="leaderboard-rank">
                  {item.rank === 1
                    ? "🥇"
                    : item.rank === 2
                    ? "🥈"
                    : item.rank === 3
                    ? "🥉"
                    : `#${item.rank}`}
                </div>

                <div className="leaderboard-game">
                  🎮 Game ID:{" "}
                  <strong>
                    {item.game_id}
                  </strong>
                </div>

                <div className="leaderboard-score">
                  🏆{" "}
                  <strong>
                    {item.score}
                  </strong>
                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Leaderboard;