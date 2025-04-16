import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import "../static/journal.css";

const Journal = () => {
  const { loggedIn, checkLogin } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState("");

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    checkLogin();

    // Extract username from URL
    const url = window.location.pathname;
    const name = url.substring(url.lastIndexOf("/") + 1);
    setUserName(name);
  }, []);

  // Call journal AI when user stops typing for 1.5s
  useEffect(() => {
    if (!journal.trim()) {
      setPrediction("");
      return;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (userName) {
        fetchPrediction(journal, userName);
      }
    }, 1500);

    return () => clearTimeout(typingTimeoutRef.current);
  }, [journal, userName]);

  const fetchPrediction = async (currentText, user) => {
    try {
      const res = await fetch("http://localhost:3000/api/journal_ai", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentText,
          userName: user,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch prediction.");

      const data = await res.json();
      console.log("Prediction:", data);
      if (data?.prediction) {
        setPrediction(data.prediction); // Expected to be a string
      }
    } catch (err) {
      console.error("Prediction error:", err);
    }
  };

  const handlePredictionClick = () => {
    setJournal((prev) => prev + prediction);
    setPrediction("");
  };

  const handleJournalSubmit = async (event) => {
    event.preventDefault();
    if (!journal.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/journal", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          journal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit journal entry.");
      }

      const data = await response.json();
      console.log(data);
      setJournal("");
      setPrediction("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loggedIn && <Navbar />}

      <div className="journal-container">
        <h1>My Journal</h1>
        <div className="journal-input-area">
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Reflect on your day, your feelings, or anything you’d like to explore..."
            rows="6"
          />
          {prediction && (
            <div className="prediction-box" onClick={handlePredictionClick}>
              <em>Suggestion: </em>
              <span className="prediction-text">{prediction}</span>
              <span className="click-to-add">(Click to complete)</span>
            </div>
          )}
          <button onClick={handleJournalSubmit} disabled={loading}>
            {loading ? "Saving..." : "Submit Entry"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Journal;
