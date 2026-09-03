import { useNavigate } from "react-router-dom";

function GameCard({
  name,
  description,
  rating,
  price,
  category,
  players,
  gameId,
  onlineUrl,
  toggleFavorites,
  isFavorite,
}) {
  const navigate = useNavigate();

  return (
    <div className="game-card">

      <h3>{name}</h3>

      <p>{description}</p>

      <p>
        ⭐ Rating: {rating ?? "Not Rated"}
      </p>

      <p>
        💰 Price: {price}
      </p>

      <p>
        🏷️ Category: {category}
      </p>

      <p>
        👥 Players: {players}
      </p>

      <div className="game-card-actions">

        {/* PLAY ONLINE */}
        {onlineUrl && (
        <button
          type="button"
          onClick={() =>
        navigate(`/games/${gameId}/play`)
      }
    >
      🎮 Play Online
    </button>
  )}

        {/* VIEW DETAILS */}
        <button
          type="button"
          onClick={() =>
            navigate(
              `/games/${gameId}`
            )
          }
        >
          📋 View Details
        </button>

        {/* FAVORITE */}
        <button
          type="button"
          onClick={() =>
            toggleFavorites(gameId)
          }
        >
          {isFavorite
            ? "❤️ Remove Favorite"
            : "🤍 Favorite"}
        </button>

      </div>

    </div>
  );
}

export default GameCard;