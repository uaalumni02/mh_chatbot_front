import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../static/navbar.css";
import { logoutUser } from "../api/userLogout";
import { downloadUserPdf } from "../api/pdfApi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = window.location.pathname.split("/").pop();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed");
    }
  };

  const handleMoodClick = () => navigate(`/graph/${userId}`);
  const handleChatClick = () => navigate(`/chat/${userId}`);
  const handleJournalClick = () => navigate(`/journal/${userId}`);
  const handlePdfDownload = () => downloadUserPdf(userId);

  const isChatPage = location.pathname.includes("chat");
  const isGraphPage = location.pathname.includes("graph");
  const isJournalPage = location.pathname.includes("journal");

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Mental Health Companion</h1>
        <ul className="navbar-links">
          <li>
            <a
              onClick={handleChatClick}
              className={`navbar-link ${isChatPage ? "inactive" : ""}`}
            >
              Chat
            </a>
          </li>
          <li>
            <a
              onClick={handleMoodClick}
              className={`navbar-link ${isGraphPage ? "inactive" : ""}`}
            >
              Mood
            </a>
          </li>
          <li>
            <a onClick={handlePdfDownload} className="navbar-link">
              PDF
            </a>
          </li>
          <li>
            <a
              onClick={handleJournalClick}
              className={`navbar-link ${isJournalPage ? "inactive" : ""}`}
            >
              Journal
            </a>
          </li>
          <li>
            <a href="/" className="navbar-link logout" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
