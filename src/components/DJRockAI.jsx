import { useState } from "react";

function DJRockAI() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();

    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    // Previous conversation
    const history = messages
      .map((item) => ({
        role:
          item.role === "user"
            ? "user"
            : "model",
        text: item.text,
      }))
      .slice(-6);

    // User message immediately show
    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    // Empty AI message
    setMessages((current) => [
      ...current,
      {
        role: "ai",
        text: "",
      },
    ]);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
            history: history,
          }),
        }
      );

      if (!response.ok) {
        let errorMessage =
          "AI response failed";

        try {
          const errorData =
            await response.json();

          errorMessage =
            errorData.error ||
            errorMessage;
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error(
          "Streaming is not supported by this response."
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let aiText = "";

      while (true) {
        const { value, done } =
          await reader.read();

        if (done) {
          break;
        }

        const chunk =
          decoder.decode(
            value,
            { stream: true }
          );

        aiText += chunk;

        // Update last AI message
        setMessages((current) => {
          const updated = [...current];

          const lastIndex =
            updated.length - 1;

          if (
            updated[lastIndex]?.role ===
            "ai"
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              text: aiText,
            };
          }

          return updated;
        });
      }

    } catch (error) {
      console.error(
        "DJRock AI Error:",
        error
      );

      setMessages((current) => {
        const updated = [...current];

        const lastIndex =
          updated.length - 1;

        if (
          updated[lastIndex]?.role ===
          "ai"
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            text:
              "⚠️ DJRock AI से connection नहीं हो पाया।",
          };
        }

        return updated;
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* AI BUTTON */}

      <button
        className="djrock-ai-button"
        type="button"
        onClick={() =>
          setOpen(!open)
        }
      >
        🤖
      </button>

      {/* CHAT WINDOW */}

      {open && (
        <div className="djrock-ai-chat">

          {/* HEADER */}

          <div className="djrock-ai-header">

            <div>
              <strong>
                🤖 DJRock AI
              </strong>

              <small>
                Gaming Assistant
              </small>
            </div>

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
            >
              ✕
            </button>

          </div>

          {/* MESSAGES */}

          <div className="djrock-ai-messages">

            {messages.length === 0 && (
              <div className="ai-message bot-message">
                आप क्या जानना चाहते हैं?
              </div>
            )}

            {messages.map(
              (item, index) => (
                <div
                  key={index}
                  className={
                    item.role === "user"
                      ? "ai-message user-message"
                      : "ai-message bot-message"
                  }
                >
                  {item.text}
                </div>
              )
            )}

            {loading && (
              <div className="ai-message bot-message">
                सोच रहा हूँ... 🤔
              </div>
            )}

          </div>

          {/* INPUT */}

          <form
            className="djrock-ai-input"
            onSubmit={sendMessage}
          >

            <input
              type="text"
              placeholder="Ask DJRock AI..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
              disabled={loading}
            >
              ➤
            </button>

          </form>

        </div>
      )}
    </>
  );
}

export default DJRockAI;