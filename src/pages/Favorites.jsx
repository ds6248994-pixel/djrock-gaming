import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function Favorites({
  favorites = [],
  toggleFavorite,
}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // LOAD ALL GAMES FROM BACKEND
  // ================================
  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/games"
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ||
              "Games load नहीं हो पाए।"
          );
        }

        setGames(result.games || []);

      } catch (error) {
        console.error(
          "Favorites Games Error:",
          error
        );

        setError(
          "Games load नहीं हो पाए।"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  // ================================
  // MATCH FAVORITES WITH DATABASE GAMES
  // ================================
  const favoriteGames = games.filter(
    (game) =>
      favorites.some(
        (favoriteId) =>
          Number(favoriteId) ===
          Number(game.id)
      )
  );

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="games-page">
        <h1>❤️ My Favorites</h1>
        <p>Loading your favorites... ⏳</p>
      </div>
    );
  }

  // ================================
  // ERROR
  // ================================
  if (error) {
    return (
      <div className="games-page">
        <h1>❤️ My Favorites</h1>

        <div className="no-games">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="games-page">

      <h1>
        ❤️ My Favorites
      </h1>

      <p className="games-subtitle">
        You have {favorites.length} saved
        favorite games.
      </p>

      <div className="games">

        {favoriteGames.length > 0 ? (

          favoriteGames.map((game) => (

            <GameCard
              key={game.id}

              name={
                game.title ??
                game.name
              }

              description={
                game.description
              }

              rating={
                game.rating
              }

              price={
                game.price ??
                "Check Store"
              }

              category={
                game.category
              }

              players={
                game.players ??
                "See Details"
              }

              gameId={Number(game.id)}

              toggleFavorites={
                toggleFavorite
              }

              isFavorite={true}
            />

          ))

        ) : (

          <div className="no-games">

            <h2>
              😔 No Favorite Games Found
            </h2>

            <p>
              Your saved favorites will
              appear here.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Favorites;