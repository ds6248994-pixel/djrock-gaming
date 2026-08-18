import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../lib/api";

function GameDetails({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // GET SINGLE GAME FROM BACKEND
  // ================================
  useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/games/${id}`
        );

        if (!response.ok) {
          throw new Error("Game not found");
        }

        const result = await response.json();

        if (!result.success || !result.game) {
          throw new Error("Game not found");
        }

        const backendGame = result.game;

        const formattedGame = {
          id: backendGame.id,
          name: backendGame.title,
          description: backendGame.description,
          category: backendGame.category,

          rating: backendGame.rating ?? null,
          price: backendGame.price ?? "Check Store",

          platform:
            backendGame.platform ??
            "PC, PlayStation, Xbox",

          players:
            backendGame.players ??
            "See Game Details",

          releaseYear:
            backendGame.releaseYear ??
            "Not Available",

          officialUrl:
            backendGame.official_url ?? null,

          image_url:
            backendGame.image_url ?? null,
        };

        setGame(formattedGame);

      } catch (err) {
        console.error(
          "Game Details API Error:",
          err
        );

        setError(
          "Game load नहीं हो पाया।"
        );

      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="game-not-found">
        <h1>Loading Game... 🎮</h1>
        <p>Please wait...</p>
      </div>
    );
  }

  // ================================
  // ERROR
  // ================================
  if (error || !game) {
    return (
      <div className="game-not-found">

        <h1>Game Not Found 🎮</h1>

        <p>
          {error ||
            "Game information unavailable."}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/games")
          }
        >
          Back to Games
        </button>

      </div>
    );
  }

  // ================================
  // GAME DETAILS
  // ================================
  return (
    <div className="game-details-page">

      <div className="game-details-card">

        <h1>{game.name}</h1>

        <p className="game-details-description">
          {game.description}
        </p>

        <div className="game-details-info">

          <p>
            <strong>⭐ Rating:</strong>{" "}
            {game.rating ??
              "Not Rated"}
          </p>

          <p>
            <strong>💰 Price:</strong>{" "}
            {game.price}
          </p>

          <p>
            <strong>🎮 Category:</strong>{" "}
            {game.category}
          </p>

          <p>
            <strong>🖥️ Platform:</strong>{" "}
            {game.platform}
          </p>

          <p>
            <strong>👥 Players:</strong>{" "}
            {game.players}
          </p>

          <p>
            <strong>📅 Release:</strong>{" "}
            {game.releaseYear}
          </p>

        </div>

        <div className="game-details-actions">

          {/* FAVORITE */}
          <button
            type="button"
            onClick={() =>
              toggleFavorite(game.id)
            }
          >
            {favorites.includes(game.id)
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </button>

          {/* PLAY NOW */}
          {game.officialUrl ? (

            <a
              href={game.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="play-now-btn"
            >
              🎮 Play Now
            </a>

          ) : (

            <button
              type="button"
              className="play-now-btn"
              disabled
            >
              🎮 Official Link Coming Soon
            </button>

          )}

          {/* BACK */}
          <button
            type="button"
            onClick={() =>
              navigate("/games")
            }
          >
            ← Back to Games
          </button>

        </div>

      </div>

    </div>
  );
}

export default GameDetails;