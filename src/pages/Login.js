import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import initialState from "../store/store";
import "../static/login.css";

const Login = () => {
  const [login, setLogin] = useState(initialState.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLogin((prev) => ({ ...prev, loading: true, invalidLogin: "" }));

    try {
      const user = await loginUser(login.userName, login.password);
      setLogin((prev) => ({
        ...prev,
        userId: user._id,
        loggedIn: true,
        loading: false,
      }));
    } catch (err) {
      setLogin((prev) => ({
        ...prev,
        invalidLogin: err.message || "Login failed",
        loading: false,
      }));
    }
  };

  return (
    <div className="login-container">
      {login.loggedIn ? <Navigate to={`/chat/${login.userId}`} /> : ""}
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p>Login to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              value={login.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={login.password}
              onChange={handleChange}
              required
            />
          </div>
          {login.invalidLogin && (
            <p className="error-message">{login.invalidLogin}</p>
          )}
          <button type="submit" className="login-button">
            {login.loading ? <span className="spinner"></span> : "Login"}
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
