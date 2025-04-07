import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import { submitJournalEntry } from "../api/journal"; // ✅ New import
import "../static/journal.css";

const Journal = () => {
  const { loggedIn, checkLogin } = useContext(UserContext);
  const [entry, setEntry] = useState("");
  const [submittedEntry, setSubmittedEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userName = window.location.pathname.split("/").pop(); // Extract once and reuse

  useEffect(() => {
    checkLogin();
  }, []);

  const handleJournalSubmit = async () => {
    if (!entry.trim()) return;

    setLoading(true);
    setError("");
    setSubmittedEntry("");

    try {
      await submitJournalEntry(userName, entry);
      setSubmittedEntry(entry);
      setEntry("");
    } catch (err) {
      setError(err.message);
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
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Reflect on your day, your feelings, or anything you’d like to explore..."
            rows="6"
          />
          <button onClick={handleJournalSubmit} disabled={loading}>
            {loading ? "Saving..." : "Submit Entry"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {submittedEntry && (
          <div className="journal-response">
            <strong>Last Entry:</strong>
            <p>{submittedEntry}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Journal;
