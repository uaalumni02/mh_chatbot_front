import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../static/navbar.css";

const Navbar = () => {
  const location = useLocation(); // Get the current location (path)
  const navigate = useNavigate(); // To programmatically navigate if needed

  const handleLogout = () => {
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch(() => {});
  };

  // Check if the current path is the chat page
  const isChatPage = location.pathname.includes("chat");
  const isGraphPage = location.pathname.includes("graph");
  const isJournalPage = location.pathname.includes("journal");

  // Handle Mood link click
  const handleMoodClick = () => {
    const userId = window.location.pathname.split("/").pop();
    navigate(`/graph/${userId}`);
  };

  const handleChatClick = () => {
    const userId = window.location.pathname.split("/").pop();
    navigate(`/chat/${userId}`);
  };

  const handleJournalClick = () => {
    const userId = window.location.pathname.split("/").pop();
    navigate(`/journal/${userId}`);
  };

  const generatePdf = () => {
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf("/") + 1);

    fetch(`http://localhost:3000/api/pdf/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.blob()) // Convert response to a Blob (PDF file)
      .then((blob) => {
        console.log("Received PDF Blob:", blob); // Log the blob object

        // Create a URL for the blob and open it in a new tab
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Mental Health Companion</h1>
        <ul className="navbar-links">
          <li>
            <a
              onClick={handleChatClick}
              className={`navbar-link ${isChatPage ? "inactive" : ""}`} // Add 'inactive' class if on the chat page
            >
              Chat
            </a>
          </li>
          <li>
            <a
              onClick={handleMoodClick}
              className={`navbar-link ${isGraphPage ? "inactive" : ""}`}
              style={{ cursor: "pointer" }}
            >
              Mood
            </a>
          </li>

          <li>
            <a
              className={`navbar-link ${isChatPage ? "inactive" : ""}`}
              onClick={generatePdf}
            >
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
