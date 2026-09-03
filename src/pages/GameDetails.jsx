import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../lib/api";
import { supabase } from "../lib/supabase";

function GameDetails({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // REVIEWS STATE
  // ================================
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const [reviewMessage, setReviewMessage] =
    useState("");

  const [reviewLoading, setReviewLoading] =
    useState(false);

  const [editingReviewId, setEditingReviewId] =
    useState(null);

  // ================================
  // GET SINGLE GAME
  // ================================
  useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/games/${id}`
        );

        if (!response.ok) {
          throw new Error("Game not found");
        }

        const result =
          await response.json();

        if (
          !result.success ||
          !result.game
        ) {
          throw new Error("Game not found");
        }

        const backendGame =
          result.game;

        const formattedGame = {
          id: backendGame.id,
          name: backendGame.title,
          description:
            backendGame.description,
          category:
            backendGame.category,

          rating:
            backendGame.rating ?? null,

          price:
            backendGame.price ??
            "Check Store",

          platform:
            backendGame.platform ??
            "PC, PlayStation, Xbox",

          players:
            backendGame.players ??
            "See Game Details",

          releaseYear:
            backendGame.release_date ??
            "Not Available",

          officialUrl:
            backendGame.official_url ??
            null,

          image_url:
            backendGame.image_url ??
            null,
        };

        setGame(formattedGame);

      } catch (err) {
        console.error(
          "Game Details API Error:",
          err
        );

        setError(
          "Game load नहीं हो पाया।"
        );

      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  // ================================
  // LOAD REVIEWS
  // ================================
  async function loadReviews() {
    try {
      setReviewsLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/games/${id}/reviews`
        );

      const result =
        await response.json();

      if (!response.ok) {
        console.error(
          "Reviews Load Error:",
          result
        );

        return;
      }

      setReviews(
        result.reviews || []
      );

    } catch (error) {
      console.error(
        "Load Reviews Error:",
        error
      );

    } finally {
      setReviewsLoading(false);
    }
  }

  // ================================
  // LOAD REVIEWS ON PAGE OPEN
  // ================================
  useEffect(() => {
    if (id) {
      loadReviews();
    }
  }, [id]);

  // ================================
  // SUBMIT / UPDATE REVIEW
  // ================================
  async function handleReviewSubmit(
    event
  ) {
    event.preventDefault();

    if (!reviewText.trim()) {
      setReviewMessage(
        "Review लिखना जरूरी है।"
      );

      return;
    }

    try {
      setReviewLoading(true);
      setReviewMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setReviewMessage(
          "Review देने के लिए पहले login करें।"
        );

        return;
      }

      const isEditing =
        editingReviewId !== null;

      const url = isEditing
        ? `${API_URL}/api/reviews/${editingReviewId}`
        : `${API_URL}/api/games/${id}/reviews`;

      const method = isEditing
        ? "PUT"
        : "POST";

      const response =
        await fetch(url, {
          method,

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            rating: Number(rating),
            review_text:
              reviewText.trim(),
          }),
        });

      const result =
        await response.json();

      if (!response.ok) {
        console.error(
          "Review Save Error:",
          result
        );

        setReviewMessage(
          result.error ||
            "Review save नहीं हुआ।"
        );

        return;
      }

      setReviewMessage(
        isEditing
          ? "Review updated successfully! ⭐"
          : "Review added successfully! ⭐"
      );

      setRating(5);
      setReviewText("");
      setEditingReviewId(null);

      await loadReviews();

    } catch (error) {
      console.error(
        "Review Submit Error:",
        error
      );

      setReviewMessage(
        "Review save नहीं हुआ।"
      );

    } finally {
      setReviewLoading(false);
    }
  }

  // ================================
  // EDIT REVIEW
  // ================================
  function handleEditReview(review) {
    setEditingReviewId(
      review.id
    );

    setRating(
      Number(review.rating)
    );

    setReviewText(
      review.review_text
    );

    setReviewMessage("");
  }

  // ================================
  // CANCEL EDIT
  // ================================
  function handleCancelEdit() {
    setEditingReviewId(null);
    setRating(5);
    setReviewText("");
    setReviewMessage("");
  }

  // ================================
  // DELETE REVIEW
  // ================================
  async function handleDeleteReview(
    reviewId
  ) {
    const confirmed =
      window.confirm(
        "क्या आप यह review delete करना चाहते हैं?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setReviewMessage(
          "Please login first."
        );

        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/reviews/${reviewId}`,
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

      if (!response.ok) {
        console.error(
          "Delete Review Error:",
          result
        );

        setReviewMessage(
          result.error ||
            "Review delete नहीं हुआ।"
        );

        return;
      }

      setReviewMessage(
        "Review deleted successfully."
      );

      await loadReviews();

    } catch (error) {
      console.error(
        "Delete Review Error:",
        error
      );

      setReviewMessage(
        "Review delete नहीं हुआ।"
      );
    }
  }

  // ================================
  // LOADING GAME
  // ================================
  if (loading) {
    return (
      <div className="game-not-found">
        <h1>
          Loading Game... 🎮
        </h1>

        <p>
          Please wait...
        </p>
      </div>
    );
  }

  // ================================
  // GAME ERROR
  // ================================
  if (error || !game) {
    return (
      <div className="game-not-found">

        <h1>
          Game Not Found 🎮
        </h1>

        <p>
          {error ||
            "Game information unavailable."}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/games")
          }
        >
          Back to Games
        </button>

      </div>
    );
  }

  // ================================
  // GAME DETAILS
  // ================================
  return (
    <div className="game-details-page">

      <div className="game-details-card">

        <h1>
          {game.name}
        </h1>

        <p className="game-details-description">
          {game.description}
        </p>

        <div className="game-details-info">

          <p>
            <strong>
              ⭐ Rating:
            </strong>{" "}
            {game.rating ??
              "Not Rated"}
          </p>

          <p>
            <strong>
              💰 Price:
            </strong>{" "}
            {game.price}
          </p>

          <p>
            <strong>
              🎮 Category:
            </strong>{" "}
            {game.category}
          </p>

          <p>
            <strong>
              🖥️ Platform:
            </strong>{" "}
            {game.platform}
          </p>

          <p>
            <strong>
              👥 Players:
            </strong>{" "}
            {game.players}
          </p>

          <p>
            <strong>
              📅 Release:
            </strong>{" "}
            {game.releaseYear}
          </p>

        </div>

        {/* ================================
            GAME ACTIONS
        ================================ */}

        <div className="game-details-actions">

          <button
            type="button"
            onClick={() =>
              toggleFavorite(game.id)
            }
          >
            {favorites.includes(game.id)
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </button>

          {game.officialUrl ? (
            <a
              href={game.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="play-now-btn"
            >
              🎮 Play Now
            </a>
          ) : (
            <button
              type="button"
              className="play-now-btn"
              disabled
            >
              🎮 Official Link Coming Soon
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              navigate("/games")
            }
          >
            ← Back to Games
          </button>

        </div>

        {/* ================================
            REVIEWS SECTION
        ================================ */}

        <div className="reviews-section">

          <h2>
            ⭐ Reviews
          </h2>

          {/* REVIEW FORM */}

          <form
            className="review-form"
            onSubmit={
              handleReviewSubmit
            }
          >

            <h3>
              {editingReviewId
                ? "✏️ Edit Your Review"
                : "Write a Review"}
            </h3>

            {/* RATING */}

            <div className="review-rating">

              <label>
                Rating:
              </label>

              <div className="star-selector">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <= rating
                          ? "star active"
                          : "star"
                      }
                      onClick={() =>
                        setRating(star)
                      }
                    >
                      ★
                    </button>
                  )
                )}

              </div>

            </div>

            {/* REVIEW TEXT */}

            <textarea
              value={reviewText}
              onChange={(e) =>
                setReviewText(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              rows="5"
              maxLength="1000"
            />

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={reviewLoading}
              className="review-submit-btn"
            >
              {reviewLoading
                ? "Saving..."
                : editingReviewId
                ? "Update Review"
                : "Submit Review"}
            </button>

            {/* CANCEL */}

            {editingReviewId && (
              <button
                type="button"
                onClick={
                  handleCancelEdit
                }
                className="review-cancel-btn"
              >
                Cancel Edit
              </button>
            )}

            {reviewMessage && (
              <p className="review-message">
                {reviewMessage}
              </p>
            )}

          </form>

          {/* EXISTING REVIEWS */}

          <div className="reviews-list">

            <h3>
              Community Reviews
            </h3>

            {reviewsLoading ? (
              <p>
                Loading reviews...
              </p>
            ) : reviews.length === 0 ? (
              <p>
                अभी इस game का कोई review नहीं है।
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-item"
                >

                  <div className="review-header">

                    <div>
                      <span className="review-stars">
                        {"★".repeat(
                          Number(
                            review.rating
                          )
                        )}
                      </span>

                      <span className="review-empty-stars">
                        {"★".repeat(
                          5 -
                            Number(
                              review.rating
                            )
                        )}
                      </span>
                    </div>

                    <span className="review-date">
                      {review.created_at
                        ? new Date(
                            review.created_at
                          ).toLocaleDateString()
                        : ""}
                    </span>

                  </div>

                  <p className="review-text">
                    {review.review_text}
                  </p>

                  <div className="review-actions">

                    <button
                      type="button"
                      onClick={() =>
                        handleEditReview(
                          review
                        )
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteReview(
                          review.id
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

      </div>

    </div>
  );
}

export default GameDetails;