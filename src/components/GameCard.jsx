import { useNavigate } from "react-router-dom";

function GameCard({
  name,
  description,
  rating,
  price,
  category,
  players,
  gameId,
  toggleFavorites,
  isFavorite
}) {
  const navigate = useNavigate();

  return (
    <div className="game-card">

      <h2>{name}</h2>

      <p>{description}</p>

     <p>⭐ Rating: {rating ?? "Not Rated"}</p>

       <p>💰 Price: {price}</p>

      <p>🏷️ Category: {category}</p>

      <p>👥 Players: {players}</p>

      <button
        onClick={() => toggleFavorites(gameId)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <button
        onClick={() => navigate(`/games/${gameId}`)}
      >
        View Details
      </button>

    </div>
  );
}

export default GameCard;