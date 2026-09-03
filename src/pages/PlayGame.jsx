import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../lib/api";
import { supabase } from "../lib/supabase";

function PlayGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [target, setTarget] = useState({
    x: 50,
    y: 50,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  // ================================
  // MOVE TARGET
  // ================================
  function moveTarget() {
    setTarget({
      x: Math.floor(Math.random() * 86) + 7,
      y: Math.floor(Math.random() * 76) + 10,
    });
  }

  // ================================
  // START GAME
  // ================================
  function startGame() {
    clearInterval(timerRef.current);

    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(true);
    setMessage("");

    moveTarget();

    timerRef.current = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timerRef.current);
          setGameStarted(false);
          setGameOver(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  }

  // ================================
  // HIT TARGET
  // ================================
  function hitTarget() {
    if (!gameStarted) {
      return;
    }

    moveTarget();
  }

  // ================================
  // SAVE PROGRESS
  // ================================
  async function saveProgress() {
    try {
      setSaving(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage("Login करें ताकि progress save हो सके।");
        return;
      }

      const progress = gameOver ? 100 : 0;

      const response = await fetch(
        `${API_URL}/api/game-progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            game_id: Number(id),
            progress,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "Save Game Progress Error:",
          result
        );

        setMessage(
          result.error ||
            "Progress save नहीं हुआ।"
        );

        return;
      }

      setMessage(
        "Game progress 100% save हो गया! 🎮"
      );
    } catch (error) {
      console.error(
        "Save Game Progress Error:",
        error
      );

      setMessage(
        "Progress save नहीं हुआ।"
      );
    } finally {
      setSaving(false);
    }
  }

  // ================================
  // CLEANUP TIMER
  // ================================
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="play-game-page">

      <div className="play-game-header">

        <button
          type="button"
          onClick={() => navigate(`/games/${id}`)}
        >
          ← Back to Game
        </button>

        <h1>🎮 Catch The Target</h1>

        <div className="game-stats">
          <strong>
            ⏱️ Time: {timeLeft}s
          </strong>
        </div>

      </div>

      <div className="play-game-container">

        {!gameStarted && !gameOver && (
          <div className="game-start-screen">

            <h2>Ready to Play?</h2>

            <p>
              Target पर जितनी बार click/tap कर सकते हो,
              30 seconds में करो!
            </p>

            <button
              type="button"
              onClick={startGame}
            >
              🚀 Start Game
            </button>

          </div>
        )}

        {gameStarted && (
          <div className="game-board">

            <button
              type="button"
              className="game-target"
              onClick={hitTarget}
              aria-label="Catch target"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
              }}
            >
              🎯
            </button>

          </div>
        )}

        {gameOver && (
          <div className="game-over-screen">

            <h2>🏁 Game Complete!</h2>

            <p>
              Great job! 🎮
            </p>

            <div className="game-over-actions">

              <button
                type="button"
                onClick={startGame}
              >
                🔄 Play Again
              </button>

              <button
                type="button"
                onClick={saveProgress}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "💾 Save Progress"}
              </button>

            </div>

            {message && (
              <p className="game-message">
                {message}
              </p>
            )}

          </div>
        )}

      </div>

      <p className="game-mobile-tip">
        📱 Mobile: target को tap करें
        &nbsp; | &nbsp;
        💻 PC: target को click करें
      </p>

    </div>
  );
}

export default PlayGame;