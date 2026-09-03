import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  // ================================
  // ADMIN STATE
  // ================================

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // ================================
  // STATS
  // ================================

  const [stats, setStats] = useState({
    games: 0,
    users: 0,
    reviews: 0,
    favorites: 0,
  });

  // ================================
  // GAMES
  // ================================

  const [games, setGames] = useState([]);

  const [search, setSearch] = useState("");

  const [editingGameId, setEditingGameId] =
    useState(null);

  const [editGame, setEditGame] = useState({
    title: "",
    rating: "",
    price: "",
    release_date: "",
    players: "",
  });

  const [updatingGame, setUpdatingGame] =
    useState(false);

  const [editMessage, setEditMessage] =
    useState("");

  // ================================
  // ADD GAME
  // ================================

  const [showAddGame, setShowAddGame] =
    useState(false);

  const [newGame, setNewGame] = useState({
    title: "",
    rating: "",
    price: "",
    release_date: "",
    players: "",
  });

  const [addingGame, setAddingGame] =
    useState(false);

  const [addMessage, setAddMessage] =
    useState("");

  // ================================
  // USERS
  // ================================

  const [users, setUsers] = useState([]);

  const [userSearch, setUserSearch] =
    useState("");

  // ================================
  // REVIEWS
  // ================================

  const [reviews, setReviews] = useState([]);

  const [reviewsLoading, setReviewsLoading] =
    useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  // ================================
  // ADMIN AUTH + DATA
  // ================================

const checkAdminAccess = useCallback(async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    const adminResponse = await fetch(
      "http://https://djrock-backend.onrender.com/api/admin/check",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const adminResult = await adminResponse.json();

    if (
      !adminResponse.ok ||
      !adminResult.success ||
      adminResult.role !== "admin"
    ) {
      navigate("/", {
        replace: true,
      });

      return;
    }

    setAuthorized(true);

    const statsResponse = await fetch(
      "http://https://djrock-backend.onrender.com/api/admin/stats",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const statsResult = await statsResponse.json();

    if (statsResponse.ok && statsResult.success) {
      setStats(statsResult.stats);
    }

    const usersResponse = await fetch(
      "http://https://djrock-backend.onrender.com/api/admin/users",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const usersResult = await usersResponse.json();

    if (usersResponse.ok && usersResult.success) {
      setUsers(usersResult.users || []);
    }

    const gamesResponse = await fetch(
      "http://https://djrock-backend.onrender.com/api/admin/games",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const gamesResult = await gamesResponse.json();

    if (gamesResponse.ok && gamesResult.success) {
      setGames(gamesResult.games || []);
    }

    setReviewsLoading(true);

    const reviewsResponse = await fetch(
      "http://https://djrock-backend.onrender.com/api/admin/reviews",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const reviewsResult = await reviewsResponse.json();

    if (reviewsResponse.ok && reviewsResult.success) {
      setReviews(reviewsResult.reviews || []);
    }

    setReviewsLoading(false);

    setFavoritesLoading(true);

    const favoritesResponse = await fetch(
      "http://https://djrock-backend.onrender.com/api/admin/favorites",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    const favoritesResult = await favoritesResponse.json();

    if (favoritesResponse.ok && favoritesResult.success) {
      setFavorites(favoritesResult.favorites || []);
    }

    setFavoritesLoading(false);
  } catch (error) {
    console.error("Admin Access Error:", error);
    navigate("/", { replace: true });
  } finally {
    setLoading(false);
  }
}, [navigate]);

// ================================
// LOAD ADMIN PAGE
// ================================

useEffect(() => {
  const runAdminCheck = async () => {
    await checkAdminAccess();
  };

  runAdminCheck();
}, [checkAdminAccess]);


  // ================================
  // DELETE REVIEW
  // ================================

  async function handleDeleteReview(review) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const response = await fetch(
        `http://https://djrock-backend.onrender.com/api/admin/reviews/${review.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },
        }
      );
      

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        console.error(
          "Delete Review Error:",
          result
        );

        alert(
          result.error ||
            "Failed to delete review"
        );

        return;
      }

      // Remove review from screen
      setReviews((currentReviews) =>
        currentReviews.filter(
          (item) =>
            item.id !== review.id
        )
      );

      // Update review count
      setStats((currentStats) => ({
        ...currentStats,

        reviews: Math.max(
          0,
          (currentStats.reviews || 0) - 1
        ),
      }));

      alert(
        "Review deleted successfully! 🗑️"
      );

    } catch (error) {
      console.error(
        "Delete Review Error:",
        error
      );

      alert(
        "Something went wrong while deleting the review."
      );
    }
  }

// ================================
// DELETE FAVORITE
// ================================

async function handleDeleteFavorite(favorite) {
  const confirmed = window.confirm(
    "Are you sure you want to remove this favorite?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    const response = await fetch(
      `http://https://djrock-backend.onrender.com/api/admin/favorites/${favorite.id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${session.access_token}`,
        },
      }
    );

    const result = await response.json();

    if (
      !response.ok ||
      !result.success
    ) {
      console.error(
        "Delete Favorite Error:",
        result
      );

      alert(
        result.error ||
          "Failed to remove favorite"
      );

      return;
    }

    // Remove favorite from screen
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (item) =>
          item.id !== favorite.id
      )
    );

    // Update favorite count
    setStats((currentStats) => ({
      ...currentStats,

      favorites: Math.max(
        0,
        (currentStats.favorites || 0) - 1
      ),
    }));

    alert(
      "Favorite removed successfully! ❤️"
    );

  } catch (error) {
    console.error(
      "Delete Favorite Error:",
      error
    );

    alert(
      "Something went wrong while removing the favorite."
    );
  }
}

  // ================================
  // ADD GAME
  // ================================

  async function handleAddGame(event) {
    event.preventDefault();

    try {
      setAddingGame(true);
      setAddMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const response = await fetch(
        "http://https://djrock-backend.onrender.com/api/admin/games",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify(newGame),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        setAddMessage(
          result.error ||
            "Failed to add game"
        );

        return;
      }

      setGames((currentGames) => [
        ...currentGames,
        result.game,
      ]);

      setNewGame({
        title: "",
        rating: "",
        price: "",
        release_date: "",
        players: "",
      });

      setShowAddGame(false);
      setAddMessage("Game added successfully!");
    } catch (error) {
      console.error("Add Game Error:", error);
      setAddMessage("Error adding game");
    } finally {
      setAddingGame(false);
    }
  }
  

  // ================================
  // START EDIT GAME
  // ================================

  function startEditGame(game) {
    console.log(
      "EDIT BUTTON CLICKED:",
      game
    );

    setEditingGameId(game.id);

    setEditGame({
      title: game.title || "",
      rating: game.rating ?? "",
      price: game.price || "",
      release_date:
        game.release_date || "",
      players: game.players || "",
    });

    setEditMessage("");
  }

  // ================================
  // UPDATE GAME
  // ================================

  async function handleUpdateGame(event) {
    event.preventDefault();

    try {
      setUpdatingGame(true);
      setEditMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const response = await fetch(
        `http://https://djrock-backend.onrender.com/api/admin/games/${editingGameId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify(editGame),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        setEditMessage(
          result.error ||
            "Failed to update game"
        );

        return;
      }

      setGames((currentGames) =>
        currentGames.map((game) =>
          game.id === editingGameId
            ? result.game
            : game
        )
      );

      setEditMessage(
        "Game updated successfully! 🎮"
      );

      setTimeout(() => {
        setEditingGameId(null);
        setEditMessage("");
      }, 700);

    } catch (error) {
      console.error(
        "Update Game Error:",
        error
      );

      setEditMessage(
        "Something went wrong."
      );

    } finally {
      setUpdatingGame(false);
    }
  }
  

  // ================================
  // DELETE GAME
  // ================================

  async function handleDeleteGame(game) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${game.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const response = await fetch(
        `http://https://djrock-backend.onrender.com/api/admin/games/${game.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        console.error(
          "Delete Game Error:",
          result
        );

        alert(
          result.error ||
            "Failed to delete game"
        );

        return;
      }

      setGames((currentGames) =>
        currentGames.filter(
          (item) =>
            item.id !== game.id
        )
      );

      setStats((currentStats) => ({
        ...currentStats,

        games: Math.max(
          0,
          (currentStats.games || 0) - 1
        ),
      }));

      alert(
        "Game deleted successfully! 🗑️"
      );

    } catch (error) {
      console.error(
        "Delete Game Error:",
        error
      );

      alert(
        "Something went wrong while deleting the game."
      );
    }
  }

  // ================================
  // UPDATE USER ROLE
  // ================================

  async function handleUpdateUserRole(
    user,
    newRole
  ) {
    if (user.role === newRole) {
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (
        currentUser &&
        currentUser.id === user.id &&
        newRole !== "admin"
      ) {
        alert(
          "You cannot remove your own admin role."
        );

        return;
      }

      const confirmed = window.confirm(
        `Change ${
          user.username || "this user"
        } role to ${newRole}?`
      );

      if (!confirmed) {
        return;
      }

      const response = await fetch(
        `http://https://djrock-backend.onrender.com/api/admin/users/${user.id}/role`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        alert(
          result.error ||
            "Failed to update user role"
        );

        return;
      }

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === user.id
            ? result.user
            : item
        )
      );

      alert(
        "User role updated successfully! 👑"
      );

    } catch (error) {
      console.error(
        "Update User Role Error:",
        error
      );

      alert(
        "Something went wrong while updating the role."
      );
    }
  }

  // ================================
  // DELETE USER
  // ================================

  async function handleDeleteUser(user) {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login", {
          replace: true,
        });

        return;
      }

      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (
        currentUser &&
        currentUser.id === user.id
      ) {
        alert(
          "You cannot delete your own admin account."
        );

        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete "${
          user.username || "this user"
        }"?`
      );

      if (!confirmed) {
        return;
      }

      const response = await fetch(
        `http://https://djrock-backend.onrender.com/api/admin/users/${user.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,
          },
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        alert(
          result.error ||
            "Failed to delete user"
        );

        return;
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (item) =>
            item.id !== user.id
        )
      );

      setStats((currentStats) => ({
        ...currentStats,

        users: Math.max(
          0,
          (currentStats.users || 0) - 1
        ),
      }));

      alert(
        "User deleted successfully! 🗑️"
      );

    } catch (error) {
      console.error(
        "Delete User Error:",
        error
      );

      alert(
        "Something went wrong while deleting the user."
      );
    }
  }

  // ================================
  // FILTER GAMES
  // ================================

  const filteredGames =
    games.filter((game) =>
      game.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ================================
  // FILTER USERS
  // ================================

const filteredUsers =
  users.filter((user) => {

    const search =
      userSearch.toLowerCase();

    return (
      (user.username || "")
        .toLowerCase()
        .includes(search) ||

      (user.id || "")
        .toLowerCase()
        .includes(search) ||

      (user.role || "")
        .toLowerCase()
        .includes(search)
    );

  });

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="admin-loading">
        <h2>
          Checking Admin Access...
        </h2>
      </div>
    );
  }

  // ================================
  // NOT AUTHORIZED
  // ================================

  if (!authorized) {
    return null;
  }

  // ================================
  // ADMIN DASHBOARD
  // ================================

  return (
    <div className="admin-page">

      {/* ================================
          HEADER
      ================================ */}

      <div className="admin-header">

        <h1>
          DJROCK Admin 👑
        </h1>

        <p>
          Admin Dashboard
        </p>

      </div>

      {/* ================================
          STATISTICS
      ================================ */}

      <div className="admin-stats">

        {/* GAMES */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🎮
          </div>

          <div>

            <h3>
              Total Games
            </h3>

            <strong>
              {stats.games}
            </strong>

          </div>

        </div>

        {/* USERS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            👤
          </div>

          <div>

            <h3>
              Total Users
            </h3>

            <strong>
              {stats.users}
            </strong>

          </div>

        </div>

        {/* REVIEWS */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ⭐
          </div>

          <div>

            <h3>
              Total Reviews
            </h3>

            <strong>
              {stats.reviews}
            </strong>

          </div>

        </div>

        {/* FAVORITES */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ❤️
          </div>

          <div>

            <h3>
              Total Favorites
            </h3>

            <strong>
              {stats.favorites}
            </strong>

          </div>

        </div>

      </div>

      {/* ================================
          USERS MANAGEMENT
      ================================ */}

      <div className="admin-users">

        <div className="admin-section-header">

          <h2>
            👥 Users Management
          </h2>

          <span>
            {filteredUsers.length} /{" "}
            {users.length} Users
          </span>

        </div>

        {/* USER SEARCH */}

        <div className="admin-users-tools">

          <input
            type="text"
            placeholder="🔍 Search users..."
            value={userSearch}
            onChange={(e) =>
              setUserSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* USERS LIST */}

        <div className="admin-users-list">

          {users.length === 0 ? (

            <div className="admin-no-games">

              <h3>
                No users found 👤
              </h3>

              <p>
                No registered users available.
              </p>

            </div>

          ) : (

            filteredUsers.map((user) => (

              <div
                className="admin-user-row"
                key={user.id}
              >

                <div className="admin-user-avatar">

                  {user.avatar_url ? (

                    <img
                      src={user.avatar_url}
                      alt={
                        user.username ||
                        "User"
                      }
                    />

                  ) : (
                    "👤"
                  )}

                </div>

                <div className="admin-user-info">

                  <strong>
                    {user.username ||
                      "Unknown User"}
                  </strong>

                <span
                    className={`admin-role-badge ${
                      user.role === "admin"
                        ? "admin-role"
                        : "user-role"
                    }`}
                  >
                    {user.role === "admin" ? "👑 Admin" : "👤 User"}
                  </span>
                  <span>
                    📅 Joined:{" "}
                    {user.created_at
                      ? new Date(
                          user.created_at
                        ).toLocaleDateString()
                      : "Unknown"}
                  </span>

                 <span
                  className="admin-user-id"
                  title={user.id}
                >
                  🆔 ID: {user.id.slice(0, 8)}...
                </span>

                </div>

                <div className="admin-user-actions">

                  <select
                    value={
                      user.role || "user"
                    }
                    onChange={(e) =>
                      handleUpdateUserRole(
                        user,
                        e.target.value
                      )
                    }
                  >

                    <option value="user">
                      👤 User
                    </option>

                    <option value="admin">
                      👑 Admin
                    </option>

                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteUser(
                        user
                      )
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* ================================
          GAMES MANAGEMENT
      ================================ */}

      <div className="admin-games">

        {/* ================================
            SEARCH + ADD
        ================================ */}

        <div className="admin-games-tools">

          <input
            type="text"
            placeholder="🔍 Search games..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <button
            type="button"
            onClick={() => {
              setShowAddGame(
                !showAddGame
              );

              setAddMessage("");
            }}
          >
            ➕ Add Game
          </button>

        </div>

        {/* ================================
            ADD GAME FORM
        ================================ */}

        {showAddGame && (

          <form
            className="admin-add-game"
            onSubmit={handleAddGame}
          >

            <h3>
              ➕ Add New Game
            </h3>

            <div className="admin-form-grid">

              {/* TITLE */}

              <input
                type="text"
                placeholder="Game Title *"
                value={newGame.title}
                onChange={(e) =>
                  setNewGame({
                    ...newGame,
                    title:
                      e.target.value,
                  })
                }
                required
              />

              {/* RATING */}

              <input
                type="number"
                min="0"
                max="5"
                step="0.01"
                placeholder="Rating (0 - 5)"
                value={newGame.rating}
                onChange={(e) =>
                  setNewGame({
                    ...newGame,
                    rating:
                      e.target.value,
                  })
                }
              />

              {/* PRICE */}

              <input
                type="text"
                placeholder="Price e.g. ₹2,999"
                value={newGame.price}
                onChange={(e) =>
                  setNewGame({
                    ...newGame,
                    price:
                      e.target.value,
                  })
                }
              />

              {/* RELEASE DATE */}

              <input
                type="date"
                value={
                  newGame.release_date
                }
                onChange={(e) =>
                  setNewGame({
                    ...newGame,
                    release_date:
                      e.target.value,
                  })
                }
              />

              {/* PLAYERS */}

              <input
                type="text"
                placeholder="Players e.g. Single-player, Online"
                value={newGame.players}
                onChange={(e) =>
                  setNewGame({
                    ...newGame,
                    players:
                      e.target.value,
                  })
                }
              />

            </div>

            {/* MESSAGE */}

            {addMessage && (

              <p className="admin-add-message">
                {addMessage}
              </p>

            )}

            {/* BUTTONS */}

            <div className="admin-form-actions">

              <button
                type="submit"
                disabled={addingGame}
              >
                {addingGame
                  ? "Adding..."
                  : "💾 Save Game"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAddGame(false);
                  setAddMessage("");
                }}
              >
                ❌ Cancel
              </button>

            </div>

          </form>

        )}

        {/* ================================
            GAMES LIST
        ================================ */}

        <div className="admin-games-list">

          {/* EDIT GAME */}

          {editingGameId !== null && (

            <form
              className="admin-add-game"
              onSubmit={
                handleUpdateGame
              }
            >

              <h3>
                ✏️ Edit Game
              </h3>

              <div className="admin-form-grid">

                <input
                  type="text"
                  placeholder="Game Title *"
                  value={editGame.title}
                  onChange={(e) =>
                    setEditGame({
                      ...editGame,
                      title:
                        e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.01"
                  placeholder="Rating"
                  value={editGame.rating}
                  onChange={(e) =>
                    setEditGame({
                      ...editGame,
                      rating:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Price"
                  value={editGame.price}
                  onChange={(e) =>
                    setEditGame({
                      ...editGame,
                      price:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  value={
                    editGame.release_date
                  }
                  onChange={(e) =>
                    setEditGame({
                      ...editGame,
                      release_date:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Players"
                  value={editGame.players}
                  onChange={(e) =>
                    setEditGame({
                      ...editGame,
                      players:
                        e.target.value,
                    })
                  }
                />

              </div>

              {editMessage && (

                <p className="admin-add-message">
                  {editMessage}
                </p>

              )}

              <div className="admin-form-actions">

                <button
                  type="submit"
                  disabled={
                    updatingGame
                  }
                >
                  {updatingGame
                    ? "Updating..."
                    : "💾 Update Game"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingGameId(
                      null
                    );

                    setEditMessage(
                      ""
                    );
                  }}
                >
                  ❌ Cancel
                </button>

              </div>

            </form>

          )}

          {/* GAMES */}

          {filteredGames.length === 0 ? (

            <div className="admin-no-games">

              <h3>
                No games found 🎮
              </h3>

              <p>
                Try another search.
              </p>

            </div>

          ) : (

            filteredGames.map((game) => (

              <div
                className="admin-game-row"
                key={game.id}
              >

                {/* GAME INFORMATION */}

                <div className="admin-game-info">

                  <strong>
                    #{game.id}{" "}
                    {game.title}
                  </strong>

                  <span>
                    ⭐{" "}
                    {game.rating ??
                      "Not Rated"}
                  </span>

                  <span>
                    💰{" "}
                    {game.price ||
                      "Check Store"}
                  </span>

                  <span>
                    📅{" "}
                    {game.release_date ||
                      "Not Available"}
                  </span>

                  <span>
                    👥{" "}
                    {game.players ||
                      "Not Available"}
                  </span>

                </div>

                {/* ACTIONS */}

                <div className="admin-game-actions">

                  <button
                    type="button"
                    onClick={() =>
                      startEditGame(
                        game
                      )
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteGame(
                        game
                      )
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* ================================
          REVIEWS MANAGEMENT
      ================================ */}

      <section className="admin-section">

        <div className="section-header">

          <h2>
            ⭐ Reviews Management
          </h2>

          <span>
            {reviews.length} Reviews
          </span>

        </div>

        {reviewsLoading ? (

          <p>
            Loading reviews...
          </p>

        ) : reviews.length === 0 ? (

          <p>
            No reviews found.
          </p>

        ) : (

          <div className="reviews-list">

            {reviews.map((review) => (

              <div
                className="review-card"
                key={review.id}
              >

                <div className="review-info">

                <p>
                    <strong>
                      👤 User:
                    </strong>{" "}
                    {users.find(
                      (user) =>
                        user.id === review.user_id
                    )?.username || "Unknown User"}
                  </p>
                   <p>
                    <strong>
                      🎮 Game:
                    </strong>{" "}
                    {games.find(
                      (game) =>
                        game.id === review.game_id
                    )?.title || "Unknown Game"}
                  </p>
                  <p>
                    <strong>
                      Rating:
                    </strong>{" "}
                    {"⭐".repeat(
                      Number(
                        review.rating
                      ) || 0
                    )}
                  </p>

                  <p>
                    <strong>
                      Review:
                    </strong>{" "}
                    {review.review_text}
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {review.created_at
                      ? new Date(
                          review.created_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteReview(
                        review
                      )
                    }
                    className="delete-btn"
                  >
                    🗑️ Delete Review
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ================================
          FAVORITES MANAGEMENT
      ================================ */}

      <section className="admin-section">

        <div className="section-header">

          <h2>
            ❤️ Favorites Management
          </h2>

          <span>
            {favorites.length} Favorites
          </span>

        </div>

        {favoritesLoading ? (

          <p>
            Loading favorites...
          </p>

        ) : favorites.length === 0 ? (

          <p>
            No favorites found.
          </p>

        ) : (

          <div className="reviews-list">

            {favorites.map((favorite) => (

              <div
                className="review-card"
                key={favorite.id}
              >

                <div className="review-info">

                  <p>
                    <strong>
                      👤 User:
                    </strong>{" "}
                    {favorite.username || "Unknown User"}
                  </p>
                  <p>
                    <strong>
                      🎮 Game:
                    </strong>{" "}
                    {favorite.game_title || "Unknown Game"}
                  </p>
                  <p>
                    <strong>
                        Type:
                    </strong>{" "}
                    {favorite.type || "Favorite"}
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {favorite.created_at
                      ? new Date(
                          favorite.created_at
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteFavorite(
                        favorite
                      )
                    }
                    className="delete-btn"
                  >
                    🗑️ Remove Favorite
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default Admin;