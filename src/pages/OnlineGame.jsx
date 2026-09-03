import { useNavigate } from "react-router-dom";

function OnlineGame() {
  const navigate = useNavigate();

  return (
    <div className="online-game-page">

      <button
        type="button"
        onClick={() => navigate("/games")}
      >
        ← Back to Games
      </button>

      <h1>🐍 Snake Warz IO</h1>

      <p>
        🎮 Play Online | 📱 Mobile | 💻 PC
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          margin: "20px auto",
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        <iframe
          src="https://www.madkidgames.com/full/snake-warz-io-games-snake-game"
          title="Snake Warz IO"
          width="100%"
          height="540"
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            display: "block",
            width: "100%",
            minHeight: "540px",
            border: "none",
          }}
        />
      </div>

      <p>
        📱 Mobile: Touch & drag से snake control करें।
        <br />
        💻 PC: Arrow keys या mouse से control करें।
      </p>

    </div>
  );
}

export default OnlineGame;