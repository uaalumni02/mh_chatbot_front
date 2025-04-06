import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import "../static/journal.css";

const Journal = () => {
  const { loggedIn, checkLogin } = useContext(UserContext);
  const [entry, setEntry] = useState("");
  const [submittedEntry, setSubmittedEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkLogin();
  }, []);

  const handleJournalSubmit = async () => {
    const url = window.location.pathname;
    const userName = url.substring(url.lastIndexOf("/") + 1);
    if (!entry.trim()) return;

    setLoading(true);
    setError("");
    setSubmittedEntry("");

    try {
      const res = await fetch("http://localhost:3000/api/journal", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, journal: entry }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedEntry(entry);
        setEntry("");
      } else {
        throw new Error(data.error || "Unable to save journal entry.");
      }
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
