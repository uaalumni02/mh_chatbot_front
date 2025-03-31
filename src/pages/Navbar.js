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

    // navigate("/"); // Uncomment to navigate to the homepage after logout
  };

  // Check if the current path is the chat page
  const isChatPage = location.pathname.includes("chat")

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Mental Health Companion</h1>
        <ul className="navbar-links">
          <li>
            <a
              href="/chat"
              className={`navbar-link ${isChatPage ? "inactive" : ""}`} // Add 'inactive' class if on the chat page
            >
              Chat
            </a>
          </li>
          <li>
            <a href="/about" className="navbar-link">
              Mood
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
