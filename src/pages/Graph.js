import React, { useState, useEffect } from "react";
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

const MoodTrendsGraph = ({ moodData }) => {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    if (moodData && moodData.length) {
      setFormattedData(
        moodData.map((entry) => ({
          date: entry.date,
          mood: entry.mood,
          moodLabel: getMoodLabel(entry.mood),
        }))
      );
    } else {
      // Dummy data representing mood analysis from user messages
      const dummyData = [
        { date: "2025-03-01", mood: 1, message: "Today was amazing!" },
        { date: "2025-03-02", mood: 0, message: "It was an okay day." },
        { date: "2025-03-03", mood: -1, message: "Feeling really down today." },
        {
          date: "2025-03-04",
          mood: 1,
          message: "Had a great conversation with a friend.",
        },
        { date: "2025-03-05", mood: 0, message: "Nothing special happened." },
        { date: "2025-03-06", mood: -1, message: "Stressed about work." },
        {
          date: "2025-03-07",
          mood: 1,
          message: "Enjoyed a nice walk outside.",
        },
      ];
      setFormattedData(
        dummyData.map((entry) => ({
          date: entry.date,
          mood: entry.mood,
          moodLabel: getMoodLabel(entry.mood),
          message: entry.message,
        }))
      );
    }
  }, [moodData]);

  const getMoodLabel = (mood) => {
    return mood === 1 ? "Positive" : mood === 0 ? "Neutral" : "Negative";
  };

  return (
    <div className="mood-trends-container">
      <br></br> <br></br> <br></br>
      <h1>Mood Trends</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[-1, 1]}
            tickFormatter={(tick) => getMoodLabel(tick)}
          />
          <Tooltip
            formatter={(value, name, props) => [getMoodLabel(value), "Mood"]}
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
      <div className="mood-messages">
        <h2>Recent Mood Analysis</h2>
        <ul>
          {formattedData.map((entry, index) => (
            <li key={index}>
              <strong>{entry.date}:</strong> {entry.moodLabel} - "
              {entry.message}"
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodTrendsGraph;
