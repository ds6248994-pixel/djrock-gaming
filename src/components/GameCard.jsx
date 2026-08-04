function GameCard({ name, description, rating, price, category, players, gameId, toggleFavorites, isFavorite }) {
  return (
    <div className="game-card">
      <h3>{name}</h3>
      <p>{description}</p>
     
     <p>⭐ Rating: {rating}</p>
      <p>💰 Price: ₹{price}</p>
      <p>🏷️ Category: {category}</p>
      <p>👥 Players: {players}</p>

      <button onClick={() => {
        console.log("button Clicked");
        toggleFavorites(gameId);
      }}
      >
        {isFavorite ? "❤️" : "🤍"}
       </button>
      <button>Play Now</button>
        
      <div>
        IsFavorite: {isFavorite ? "Yes" : "No"}

    </div>
 </div>   
  );
}

export default GameCard;

