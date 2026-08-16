import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function ScoreTest() {
  const [gameId, setGameId] = useState("");
  const [score, setScore] = useState("");

  const [scores, setScores] = useState([]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================================
  // LOAD MY SCORES
  // ================================
  async function loadScores() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage("Please login first.");
        return;
      }
      <button
        type="button"
        onClick={loadLeaderboard}
    >
        🏆 Test Leaderboard
      </button>

      const response = await fetch(
        "http://localhost:5000/api/scores",
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Get Scores Error:", result);

        setMessage(
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

      setMessage(
        "Scores load नहीं हो पाए।"
      );
    }
  }

  // ================================
// LOAD LEADERBOARD
// ================================
async function loadLeaderboard() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Please login first.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/leaderboard",
      {
        headers: {
          Authorization:
            `Bearer ${session.access_token}`,
        },
      }
    );

    const result = await response.json();

    console.log(
      "Leaderboard Result:",
      result
    );

    if (!response.ok) {
      setMessage(
        result.error ||
          "Leaderboard load नहीं हुआ।"
      );
      return;
    }

    setMessage(
      `Leaderboard loaded: ${
        result.leaderboard?.length || 0
      } scores`
    );

  } catch (error) {
    console.error(
      "Leaderboard Error:",
      error
    );

    setMessage(
      "Leaderboard load नहीं हुआ।"
    );
  }
}

  // ================================
  // LOAD SCORES ON PAGE OPEN
  // ================================
  useEffect(() => {
    loadScores();
  }, []);

  // ================================
  // SAVE SCORE
  // ================================
  async function handleSaveScore(event) {
    event.preventDefault();

    if (!gameId || !score) {
      setMessage(
        "Game ID और Score दोनों डालो।"
      );
      return;
    }

    if (Number(gameId) <= 0) {
      setMessage(
        "Game ID valid होना चाहिए।"
      );
      return;
    }

    if (Number(score) < 0) {
      setMessage(
        "Score negative नहीं हो सकता।"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage(
          "Please login first."
        );
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/scores",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            game_id: Number(gameId),
            score: Number(score),
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        console.error(
          "Save Score Error:",
          result
        );

        setMessage(
          result.error ||
            "Score save नहीं हुआ।"
        );

        return;
      }

      setMessage(
        "Score saved successfully! 🏆"
      );

      setGameId("");
      setScore("");

      await loadScores();

    } catch (error) {
      console.error(
        "Save Score Error:",
        error
      );

      setMessage(
        "Score save नहीं हुआ।"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>
          🏆 DJROCK Score Test
        </h1>

        <p>
          Test your score database connection
        </p>

        <form
          onSubmit={handleSaveScore}
        >

          <input
            type="number"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(e) =>
              setGameId(e.target.value)
            }
            min="1"
          />

          <input
            type="number"
            placeholder="Enter Score"
            value={score}
            onChange={(e) =>
              setScore(e.target.value)
            }
            min="0"
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "🏆 Save Score"}
          </button>

        </form>

        {message && (
          <p className="profile-message">
            {message}
          </p>
        )}

        <hr />

        <h2>
          My Scores
        </h2>

        {scores.length === 0 ? (
          <p>
            अभी कोई score नहीं है।
          </p>
        ) : (
          <div>

            {scores.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "10px",
                }}
              >
                🎮 Game ID:{" "}
                <strong>
                  {item.game_id}
                </strong>

                {" — "}

                🏆 Score:{" "}
                <strong>
                  {item.score}
                </strong>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ScoreTest;