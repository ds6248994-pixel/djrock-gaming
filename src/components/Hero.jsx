import { useState } from "react";

function Hero() {
  const [likes, setLikes] = useState(0);

  return (
    <main>
      <section className="hero">
        <h2>Welcome to DJROCK Gaming</h2>

        <p>
          Discover the ultimate gaming experience with DJROCK.
          Join us for exciting games, videos, and more!
        </p>

        <h3>❤️ Likes: {likes}</h3>

        <div className="button-group">
          <button
            className="like-btn"
            onClick={() => setLikes(likes + 1)}
          >
            ❤️ Like
          </button>

          <button
            className="reset-btn"
            onClick={() => setLikes(0)}
          >
            🔄 Reset
          </button>

          <button
            className="dislike-btn"
            onClick={() => {
              if (likes > 0) {
                setLikes(likes - 1);
              }
            }}
          >
            👎 Dislike
          </button>
        </div>
      </section>
    </main>
  );
}

export default Hero;
