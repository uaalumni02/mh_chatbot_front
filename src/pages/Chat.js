import React, { useState } from "react";
import "../static/chat.css";

const Chatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("http://localhost:3000/api/v1/chat/completions", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: id, prompt }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setResponse(data.data);
        setPrompt(""); // ✅ Clear input field after response is generated
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h1>Mental Health Companion</h1>
      <div className="chat-input-area">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your thoughts here..."
          rows="4"
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {response && <div className="chat-response">{response}</div>}
    </div>
  );
};

export default Chatbot;
