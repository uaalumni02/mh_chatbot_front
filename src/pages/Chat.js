import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import { sendChatPrompt } from "../api/chat";
import useUserIdFromPath from "../hooks/useUserIdFromPath";
import "../static/chat.css";

const Chatbot = () => {
  const { loggedIn, checkLogin } = useContext(UserContext);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = useUserIdFromPath();

  useEffect(() => {
    checkLogin();
  }, []);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await sendChatPrompt(userId, prompt);
      setResponse(result);
      setPrompt("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loggedIn && <Navbar />}
      <br></br>
      <br></br>
      <div className="chatbot-container">
        <br></br>
        <br></br>
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
    </>
  );
};

export default Chatbot;
