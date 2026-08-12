import games from "../Data/games";
import GameCard from "../components/GameCard";
import { useState } from "react";

function Games() {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showFavorites, setShowFavorites] = useState(false);

  function toggleFavorites(id) {
    if (favorites.includes(id)) {
      setFavorites(
        favorites.filter((item) => item !== id)
      );
    } else {
      setFavorites([...favorites, id]);
    }
  }

  // Search + Category
  const filteredGames = games.filter((game) => {
    const matchSearch = game.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      game.category === category;

    return matchSearch && matchCategory;
  });

  // Sorting
  let sortedGames = [...filteredGames];

  if (sortBy === "lowToHigh") {
    sortedGames.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sortBy === "highToLow") {
    sortedGames.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  if (sortBy === "aToZ") {
    sortedGames.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortBy === "zToA") {
    sortedGames.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  // Favorites filter
  const displayGames = showFavorites
    ? sortedGames.filter((game) =>
        favorites.includes(game.id)
      )
    : sortedGames;

  const categories = [
    "All",
    "Action",
    "Fighting",
    "RPG",
    "Racing",
    "Adventure",
    "Arcade",
    "Sports",
    "Story Mode",
    "Cartoon",
  ];

  return (
    <div className="games-page">

      <h1>🎮 All Games</h1>

      <p className="games-subtitle">
        Discover 90 exciting games across different categories
      </p>

      {/* Search */}
      <div className="games-search">
        <input
          type="text"
          placeholder="🔍 Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setSearch("")}
        >
          Clear
        </button>
      </div>

      {/* Categories */}
      <div className="games-categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={
              category === item
                ? "category-active"
                : ""
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="games-sort">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">
            Default
          </option>

          <option value="lowToHigh">
            Price: Low → High
          </option>

          <option value="highToLow">
            Price: High → Low
          </option>

          <option value="aToZ">
            Name: A → Z
          </option>

          <option value="zToA">
            Name: Z → A
          </option>
        </select>
      </div>

      {/* All / Favorites */}
      <div className="games-filter">
        <button
          type="button"
          onClick={() => setShowFavorites(false)}
          className={!showFavorites ? "filter-active" : ""}
        >
          🎮 All Games
        </button>

        <button
          type="button"
          onClick={() => setShowFavorites(true)}
          className={showFavorites ? "filter-active" : ""}
        >
          ❤️ Favorites ({favorites.length})
        </button>
      </div>

      {/* Games */}
      <div className="games">

        {displayGames.length > 0 ? (
          displayGames.map((game) => (
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
          ))
        ) : (
          <div className="no-games">
            <h2>😔 No Games Found</h2>
            <p>
              Try another search or category.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default Games;