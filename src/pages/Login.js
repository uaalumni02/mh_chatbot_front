import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "../static/login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.message !== "Login successful") {
          setInvalidLogin("Invalid credentials. Please try again.");
        } else {
          setLoggedIn(true);
          setUserId(response.user._id);
        }
      })
      .catch(() => {
        setLoading(false);
        setInvalidLogin("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="login-container">
      {loggedIn ? <Navigate to={`/chat/${userId}`} /> : ""}
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Login to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {invalidLogin && <p className="error-message">{invalidLogin}</p>}
          <button type="submit" className="login-button">
            {loading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>
        <p>
          Forgot password? <Link to="/forgot-password">Reset here</Link>
        </p>
        <p>
          No account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
