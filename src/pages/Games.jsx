import games from "../Data/games";
import GameCard from "../components/GameCard";
import { useState } from "react";

function Games() {
    const [favorites, setFavorites] = useState([]);

    function toggleFavorites(id) {
        if (favorites.includes(id)) {
            setFavorites(
                favorites.filter((item) => item !== id)
            );
        } else {
            setFavorites([...favorites, id]);
        }
    }

    return (
        <>
            <h1>All Games</h1>

            <div className="games">
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        name={game.name}
                        description={game.description}
                        rating={game.rating}
                        price={game.price}
                        category={game.category}
                        players={game.players}
                        gameId={game.id}
                        toggleFavorites={toggleFavorites}
                        isFavorite={favorites.includes(game.id)}
                    />
                ))}
            </div>
        </>
    );
}

export default Games;