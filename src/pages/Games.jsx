import games from "../Data/games";
import GameCard from "../components/GameCard";

function Games() {
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
                    />
                ))}
            </div>
        </>
    );
}

export default Games;