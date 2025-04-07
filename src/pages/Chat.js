import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import { sendChatPrompt } from "../api/chat";
import useUserIdFromPath from "../hooks/useUserIdFromPath";
import initialState from "../store/store";
import "../static/chat.css";

const Chatbot = () => {
  const { loggedIn, checkLogin } = useContext(UserContext);
  const [state, setState] = useState(initialState.chatbot);
  const userId = useUserIdFromPath();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const handleSubmit = async () => {
    if (!state.prompt.trim()) return;

    setState((prev) => ({ ...prev, loading: true, error: "", response: "" }));

    try {
      const result = await sendChatPrompt(userId, state.prompt);
      setState((prev) => ({
        ...prev,
        response: result,
        prompt: "",
        loading: false,
      }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message, loading: false }));
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
            value={state.prompt}
            onChange={(e) =>
              setState((prev) => ({ ...prev, prompt: e.target.value }))
            }
            placeholder="Type your thoughts here..."
            rows="4"
          />
          <button onClick={handleSubmit} disabled={state.loading}>
            {state.loading ? "Processing..." : "Send"}
          </button>
        </div>
        {state.error && <p className="error">{state.error}</p>}
        {state.response && (
          <div className="chat-response">{state.response}</div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
