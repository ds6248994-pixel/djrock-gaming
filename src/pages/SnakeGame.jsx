import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

const BOARD_SIZE = 20;

const START_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

const DIRECTIONS = {
  UP: {
    x: 0,
    y: -1,
  },

  DOWN: {
    x: 0,
    y: 1,
  },

  LEFT: {
    x: -1,
    y: 0,
  },

  RIGHT: {
    x: 1,
    y: 0,
  },
};

// ================================
// CREATE FOOD
// ================================

function createFood(snake) {
  let food;

  do {
    food = {
      x: Math.floor(
        Math.random() * BOARD_SIZE
      ),

      y: Math.floor(
        Math.random() * BOARD_SIZE
      ),
    };
  } while (
    snake.some(
      (part) =>
        part.x === food.x &&
        part.y === food.y
    )
  );

  return food;
}

// ================================
// SNAKE GAME
// ================================

function SnakeGame() {
  
  const navigate = useNavigate();

  const [snake, setSnake] =
    useState(START_SNAKE);

  const [food, setFood] =
    useState(() =>
      createFood(START_SNAKE)
    );

  const [gameStarted, setGameStarted] =
    useState(false);

  const [gameOver, setGameOver] =
    useState(false);

  const directionRef =
    useRef(DIRECTIONS.RIGHT);

  // ================================
  // START / RESTART GAME
  // ================================

  function startGame() {
    const newSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    setSnake(newSnake);

    setFood(
      createFood(newSnake)
    );

    directionRef.current =
      DIRECTIONS.RIGHT;

    setGameOver(false);
    setGameStarted(true);
  }

  // ================================
  // CHANGE DIRECTION
  // ================================

  function changeDirection(
    newDirection
  ) {
    const current =
      directionRef.current;

    // Prevent immediate reverse
    if (
      newDirection.x === -current.x &&
      newDirection.y === -current.y
    ) {
      return;
    }

    directionRef.current =
      newDirection;
  }

  // ================================
  // KEYBOARD CONTROLS
  // ================================

  useEffect(() => {
    function handleKeyDown(event) {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();

          changeDirection(
            DIRECTIONS.UP
          );

          break;

        case "ArrowDown":
          event.preventDefault();

          changeDirection(
            DIRECTIONS.DOWN
          );

          break;

        case "ArrowLeft":
          event.preventDefault();

          changeDirection(
            DIRECTIONS.LEFT
          );

          break;

        case "ArrowRight":
          event.preventDefault();

          changeDirection(
            DIRECTIONS.RIGHT
          );

          break;

        default:
          break;
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ================================
  // GAME LOOP
  // ================================

  useEffect(() => {
    if (
      !gameStarted ||
      gameOver
    ) {
      return;
    }

    const gameLoop =
      setInterval(() => {
        setSnake(
          (currentSnake) => {
            const head =
              currentSnake[0];

            const currentDirection =
              directionRef.current;

            const newHead = {
              x:
                head.x +
                currentDirection.x,

              y:
                head.y +
                currentDirection.y,
            };

            // ================================
            // WALL COLLISION
            // ================================

            if (
              newHead.x < 0 ||
              newHead.x >= BOARD_SIZE ||
              newHead.y < 0 ||
              newHead.y >= BOARD_SIZE
            ) {
              setGameOver(true);
              setGameStarted(false);

              return currentSnake;
            }

            // ================================
            // SELF COLLISION
            // ================================

            const hitSelf =
              currentSnake.some(
                (part) =>
                  part.x === newHead.x &&
                  part.y === newHead.y
              );

            if (hitSelf) {
              setGameOver(true);
              setGameStarted(false);

              return currentSnake;
            }

            const newSnake = [
              newHead,
              ...currentSnake,
            ];

            // ================================
            // FOOD
            // ================================

            if (
              newHead.x === food.x &&
              newHead.y === food.y
            ) {
              setFood(
                createFood(newSnake)
              );

              return newSnake;
            }

            // Remove tail
            newSnake.pop();

            return newSnake;
          }
        );
      }, 140);

    return () => {
      clearInterval(gameLoop);
    };
  }, [
    gameStarted,
    gameOver,
    food,
  ]);

  // ================================
  // MOBILE CONTROLS
  // ================================

  function handleMobileDirection(
    newDirection
  ) {
    changeDirection(
      newDirection
    );
  }

  // ================================
  // UI
  // ================================

  return (
    <div className="snake-game-page">

      {/* HEADER */}

      <div className="snake-game-header">

        <button
          type="button"
          onClick={() =>
            navigate("/games")
          }
        >
          ← Back to Games
        </button>

        <h1>
          🐍 DJROCK Snake
        </h1>

      </div>

      {/* START SCREEN */}

      {!gameStarted &&
        !gameOver && (
          <div className="snake-start">

            <h2>
              Ready to Play? 🐍
            </h2>

            <p>
              Eat the food and grow
              your snake!
            </p>

            <button
              type="button"
              onClick={startGame}
            >
              🎮 Start Game
            </button>

          </div>
        )}

      {/* GAME BOARD */}

      {gameStarted && (
        <div
          className="snake-board"
          style={{
            display: "grid",

            gridTemplateColumns:
              `repeat(${BOARD_SIZE}, 1fr)`,

            width:
              "min(90vw, 500px)",

            aspectRatio: "1 / 1",

            margin: "20px auto",

            border:
              "4px solid #222",

            background:
              "#111",
          }}
        >

          {Array.from({
            length:
              BOARD_SIZE *
              BOARD_SIZE,
          }).map(
            (_, index) => {
              const x =
                index %
                BOARD_SIZE;

              const y =
                Math.floor(
                  index /
                    BOARD_SIZE
                );

              const snakePart =
                snake.find(
                  (part) =>
                    part.x === x &&
                    part.y === y
                );

              const isFood =
                food.x === x &&
                food.y === y;

              return (
                <div
                  key={index}
                  style={{
                    width: "100%",

                    aspectRatio:
                      "1 / 1",

                    background:
                      snakePart
                        ? snake[0].x === x &&
                          snake[0].y === y
                          ? "#00ff66"
                          : "#00aa44"
                        : isFood
                        ? "#ff3333"
                        : "#181818",

                    border:
                      "1px solid #222",

                    boxSizing:
                      "border-box",
                  }}
                />
              );
            }
          )}

        </div>
      )}

      {/* MOBILE CONTROLS */}

      {gameStarted && (
        <div
          className="snake-mobile-controls"
          style={{
            display: "flex",

            flexDirection:
              "column",

            alignItems:
              "center",

            gap: "8px",

            margin:
              "20px auto",
          }}
        >

          <button
            type="button"
            onClick={() =>
              handleMobileDirection(
                DIRECTIONS.UP
              )
            }
          >
            ⬆️
          </button>

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >

            <button
              type="button"
              onClick={() =>
                handleMobileDirection(
                  DIRECTIONS.LEFT
                )
              }
            >
              ⬅️
            </button>

            <button
              type="button"
              onClick={() =>
                handleMobileDirection(
                  DIRECTIONS.DOWN
                )
              }
            >
              ⬇️
            </button>

            <button
              type="button"
              onClick={() =>
                handleMobileDirection(
                  DIRECTIONS.RIGHT
                )
              }
            >
              ➡️
            </button>

          </div>

        </div>
      )}

      {/* GAME OVER */}

      {gameOver && (
        <div
          className="snake-game-over"
        >

          <h2>
            💀 Game Over!
          </h2>

          <p>
            Game खत्म हो गया!
          </p>

          <button
            type="button"
            onClick={startGame}
          >
            🔄 Play Again
          </button>

        </div>
      )}

    </div>
  );
}

export default SnakeGame;