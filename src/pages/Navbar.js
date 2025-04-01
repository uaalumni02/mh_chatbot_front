import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../static/navbar.css";

const Navbar = () => {
  const location = useLocation(); // Get the current location (path)
  const navigate = useNavigate(); // To programmatically navigate if needed

  const handleLogout = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    sessionStorage.clear();
  };

  // Check if the current path is the chat page
  const isChatPage = location.pathname.includes("chat");
  const isGraphPage = location.pathname.includes("graph");

  // Handle Mood link click
  const handleMoodClick = () => {
    const userId = window.location.pathname.split("/").pop();
    navigate(`/graph/${userId}`);
  };

  const handleChatClick = () => {
    const userId = window.location.pathname.split("/").pop();
    navigate(`/chat/${userId}`);
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
