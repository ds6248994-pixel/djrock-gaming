import games from "../Data/games";
import GameCard from "../components/GameCard";

function Favorites({ favorites, setFavorites }) {

    const favoriteGames = games.filter((game) =>
        favorites.includes(game.id)
    );

    function toggleFavorite(id) {
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
            <h1>My Favorites ❤️</h1>

            <div className="games">
                {favoriteGames.length > 0 ? (
                    favoriteGames.map((game) => (
                        <GameCard
                            key={game.id}
                            name={game.name}
                            description={game.description}
                            rating={game.rating}
                            price={game.price}
                            category={game.category}
                            players={game.players}
                            gameId={game.id}
                            toggleFavorites={toggleFavorite}
                            isFavorite={true}
                        />
                    ))
                ) : (
                    <h2>No Favorite Games Yet ❤️</h2>
                )}
            </div>
        </>
    );
}

export default Favorites;