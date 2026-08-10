import { useParams } from "react-router-dom";
import games from "../Data/games";

function GameDetails({ favorites, setFavorites }) {
    const { id } = useParams();
    console.log("URL ID:", id);

    const game = games.find((game) => game.id === Number(id));
    console.log("FOUND GAME:", game);

    function toggleFavorite() {
        if (favorites.includes(game.id)) {
            setFavorites(
                favorites.filter((item) => item !== game.id)
            );
        } else {
            setFavorites([...favorites, game.id]);
        }
    }

    if (!game) {
        return (
            <div className="game-not-found">
                <h1>Game Not Found 🎮</h1>
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
                        <strong>⭐ Rating:</strong> {game.rating}
                    </p>

                    <p>
                        <strong>💰 Price:</strong> ₹{game.price}
                    </p>

                    <p>
                        <strong>🎮 Category:</strong> {game.category}
                    </p>

                    <p>
                        <strong>👥 Players:</strong> {game.players}
                    </p>

                </div>

                <div className="game-details-actions">

                    <button onClick={toggleFavorite}>
                        {favorites.includes(game.id)
                            ? "❤️ Remove from Favorites"
                            : "❤️ Add to Favorites"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default GameDetails;