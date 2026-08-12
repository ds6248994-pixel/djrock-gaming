import { useParams, useNavigate } from "react-router-dom";
import games from "../Data/games";

function GameDetails({ favorites, setFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find(
    (game) => game.id === Number(id)
    
  );
     
       console.log("URL ID:", id);
       console.log("ALL GAME IDS:", games.map((game) => game.id));
       console.log("FOUND GAME:", game);

  function toggleFavorite() {
    if (favorites.includes(game.id)) {
      setFavorites(
        favorites.filter((item) => item !== game.id)
      );
    } else {
      setFavorites([
        ...favorites,
        game.id
      ]);
    }
  }

  if (!game) {
    return (
      <div className="game-not-found">
        <h1>Game Not Found 🎮</h1>

        <button onClick={() => navigate("/games")}>
          Back to Games
        </button>
      </div>
    );
  }

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
            {game.rating ?? "Not Rated"}
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

          <button
            type="button"
            onClick={toggleFavorite}
          >
            {favorites.includes(game.id)
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </button>


       {game.officialUrl &&
        game.officialUrl !== "Official Link Coming Soon" ? (
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
          <button
            type="button"
            onClick={() => navigate("/games")}
          >
            ← Back to Games
          </button>

        </div>

      </div>

    </div>
  );
}

export default GameDetails;