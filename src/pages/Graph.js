import React, { useState, useEffect, useMemo, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../static/graph.css";

const MoodTrendsGraph = () => {
  const { loggedIn, checkLogin } = useContext(UserContext); // Ensure checkLogin is accessible
  const [moodEntries, setMoodEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUserChats = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);

    fetch(`http://localhost:3000/api/chat/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        const fetchedData = response.data.map((entry) => ({
          id: entry._id, // Assuming each entry has a unique ID
          date: new Date(entry.createdAt).toISOString().split("T")[0], // Format YYYY-MM-DD
          mood: Number(entry.mood.score), // Ensure mood is a number
          moodLabel: entry.mood.mood,
          message: entry.prompt || "No message available",
        }));

        setMoodEntries(fetchedData);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    checkLogin();
    fetchUserChats();
  }, []);

  const formattedData = useMemo(() => moodEntries, [moodEntries]);

  const handleDeleteAll = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);

    fetch(`http://localhost:3000/api/chat/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setMoodEntries([]);
        setShowModal(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {loggedIn && <Navbar />}
      <div className="mood-trends-container">
        <br></br> <br></br>
        <h1>Mood Trends</h1>
        <div className="responsive-chart-container">
          {formattedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[-1, 1]}
                  tickFormatter={(tick) =>
                    tick === 1
                      ? "Positive"
                      : tick === 0
                      ? "Neutral"
                      : "Negative"
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    value === 1
                      ? "Positive"
                      : value === 0
                      ? "Neutral"
                      : "Negative",
                    "Mood",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#007bff"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#0056b3" }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data-message">No mood data available</p>
          )}
        </div>
        <div className="mood-messages">
          <h2>Recent Mood Analysis</h2>
          <ul>
            {formattedData.map((entry) => (
              <li key={entry.id} className="mood-entry">
                <strong>{entry.date}:</strong> {entry.moodLabel} - "
                {entry.message}"
              </li>
            ))}
          </ul>
          <button className="delete-button" onClick={() => setShowModal(true)}>
            Delete Chat
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete all chats?</p>
            <button className="confirm-button" onClick={handleDeleteAll}>
              Confirm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MoodTrendsGraph;
