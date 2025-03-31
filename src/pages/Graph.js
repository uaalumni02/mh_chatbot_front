import React, { useState, useEffect } from "react";
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
  const [formattedData, setFormattedData] = useState([]);
  const [moodEntries, setMoodEntries] = useState([]);

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
          date: new Date(entry.createdAt).toLocaleDateString(),
          mood: entry.mood.score,
          moodLabel: entry.mood.mood,
          message: entry.prompt || "No message available",
        }));

        setMoodEntries(fetchedData);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchUserChats();
  }, []);

  useEffect(() => {
    setFormattedData(moodEntries);
  }, [moodEntries]);

  return (
    <>
      <Navbar />
      <div className="mood-trends-container">
        <br></br>
        <h1>Mood Trends</h1>
        
        <div className="responsive-chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[-1, 1]}
                tickFormatter={(tick) =>
                  tick === 1 ? "Positive" : tick === 0 ? "Neutral" : "Negative"
                }
              />
              <Tooltip
                formatter={(value) => [
                  value === 1 ? "Positive" : value === 0 ? "Neutral" : "Negative",
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
        </div>

        <div className="mood-messages">
          <h2>Recent Mood Analysis</h2>
          <ul>
            {formattedData.map((entry, index) => (
              <li key={index}>
                <strong>{entry.date}:</strong> {entry.moodLabel} - "{entry.message}"
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MoodTrendsGraph;
