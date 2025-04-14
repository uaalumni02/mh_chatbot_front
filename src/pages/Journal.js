import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import "../static/journal.css";

const Journal = () => {
  const { loggedIn, checkLogin } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkLogin();
  }, []);

  const handleJournalSubmit = async (event) => {
    event.preventDefault();
    if (!journal.trim()) return;

    const url = window.location.pathname;
    const name = url.substring(url.lastIndexOf("/") + 1);

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/journal", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: name,
          journal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit journal entry.");
      }

      const data = await response.json();
      console.log(data);
      setJournal(""); // Clear the text box
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
