import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../static/navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    sessionStorage.clear();

    // navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Mental Health Companion</h1>
        <ul className="navbar-links">
          <li>
            <a href="/" className="navbar-link">
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
