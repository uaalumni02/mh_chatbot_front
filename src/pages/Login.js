import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth"; 
import "../static/login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setInvalidLogin("");

    try {
      const user = await loginUser(userName, password);
      setUserId(user._id);
      setLoggedIn(true);
    } catch (err) {
      setInvalidLogin(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
