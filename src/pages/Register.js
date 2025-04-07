import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { registerUser } from "../api/register"; 
import "../static/login.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [invalidRegister, setInvalidRegister] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setInvalidRegister("");

    try {
      const response = await registerUser({ userName, email, password });
      setUserId(response.userData.userId);
      setLoggedIn(true);
    } catch (error) {
      setInvalidRegister(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loggedIn ? <Navigate to={`/chat/${userId}`} /> : ""}
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Register to continue</p>
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {invalidRegister && (
            <p className="error-message">{invalidRegister}</p>
          )}
          <button type="submit" className="login-button">
            {loading ? <span className="spinner"></span> : "Register"}
          </button>
        </form>
        <p>
          Forgot password? <Link to="/forgot-password">Reset here</Link>
        </p>
        <p>
          Return to Login? <Link to="/">login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
