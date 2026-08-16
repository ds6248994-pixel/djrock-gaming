import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function Games({
  favorites = [],
  toggleFavorite,
}) {
  const [games, setGames] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  const [showFavorites, setShowFavorites] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ================================
  // GET ALL GAMES FROM BACKEND
  // ================================
  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/games"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch games"
          );
        }

        const result =
          await response.json();

        if (!result.success) {
          throw new Error(
            "Games data unavailable"
          );
        }

        const formattedGames =
          (result.games || []).map(
            (game) => ({
              id: game.id,

              name: game.title,

              description:
                game.description,

              rating:
                game.rating ?? null,

              price:
                game.price ??
                "Check Store",

              category:
                game.category,

              players:
                game.players ??
                "See Details",

              image_url:
                game.image_url ??
                null,

              officialUrl:
                game.official_url ??
                null,
            })
          );

        setGames(formattedGames);

      } catch (err) {
        console.error(
          "Games API Error:",
          err
        );

        setError(
          "Games load नहीं हो पाए। Backend check करें।"
        );

      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  // ================================
  // FILTER
  // ================================
  const filteredGames =
    games.filter((game) => {

      const matchSearch =
        game.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =
        category === "All" ||
        game.category === category;

      return (
        matchSearch &&
        matchCategory
      );
    });

  // ================================
  // SORT
  // ================================
  let sortedGames = [
    ...filteredGames,
  ];

  if (sortBy === "aToZ") {
    sortedGames.sort((a, b) =>
      a.name.localeCompare(
        b.name
      )
    );
  }

  if (sortBy === "zToA") {
    sortedGames.sort((a, b) =>
      b.name.localeCompare(
        a.name
      )
    );
  }

  // ================================
  // FAVORITES FILTER
  // ================================
  const displayGames =
    showFavorites
      ? sortedGames.filter((game) =>
          favorites.includes(
            Number(game.id)
          )
        )
      : sortedGames;

  // ================================
  // CATEGORIES
  // ================================
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

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="games-page">

        <h1>
          🎮 All Games
        </h1>

        <p>
          Loading games... ⏳
        </p>

      </div>
    );
  }

  // ================================
  // ERROR
  // ================================
  if (error) {
    return (
      <div className="games-page">

        <h1>
          🎮 All Games
        </h1>

        <div className="no-games">

          <h2>
            ⚠️ Games Load Error
          </h2>

          <p>{error}</p>

        </div>

      </div>
    );
  }

  // ================================
  // UI
  // ================================
  return (
    <div className="games-page">

      <h1>
        🎮 All Games
      </h1>

      <p className="games-subtitle">
        Discover {games.length} exciting
        games across different categories
      </p>

      {/* SEARCH */}
      <div className="games-search">

        <input
          type="text"
          placeholder="🔍 Search games..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          type="button"
          onClick={() =>
            setSearch("")
          }
        >
          Clear
        </button>

      </div>

      {/* CATEGORIES */}
      <div className="games-categories">

        {categories.map(
          (item) => (

            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-active"
                  : ""
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          )
        )}

      </div>

      {/* SORT */}
      <div className="games-sort">

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >

          <option value="default">
            Default
          </option>

          <option value="aToZ">
            Name: A → Z
          </option>

          <option value="zToA">
            Name: Z → A
          </option>

        </select>

      </div>

      {/* ALL / FAVORITES */}
      <div className="games-filter">

        <button
          type="button"
          onClick={() =>
            setShowFavorites(false)
          }
          className={
            !showFavorites
              ? "filter-active"
              : ""
          }
        >
          🎮 All Games
        </button>

        <button
          type="button"
          onClick={() =>
            setShowFavorites(true)
          }
          className={
            showFavorites
              ? "filter-active"
              : ""
          }
        >
          ❤️ Favorites (
          {favorites.length}
          )
        </button>

      </div>

      {/* GAMES */}
      <div className="games">

        {displayGames.length >
        0 ? (

          displayGames.map(
            (game) => (

              <GameCard
                key={game.id}

                name={game.name}

                description={
                  game.description
                }

                rating={
                  game.rating
                }

                price={
                  game.price
                }

                category={
                  game.category
                }

                players={
                  game.players
                }

                gameId={game.id}

                toggleFavorites={
                  toggleFavorite
                }

                isFavorite={
                  favorites.includes(
                    Number(game.id)
                  )
                }
              />

            )
          )

        ) : (

          <div className="no-games">

            <h2>
              😔 No Games Found
            </h2>

            <p>
              Try another search or
              category.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Games;