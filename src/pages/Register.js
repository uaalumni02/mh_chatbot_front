import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { registerUser } from "../api/register";
import initialState from "../store/store";
import "../static/login.css";

const Register = () => {
  const [register, setRegister] = useState(initialState.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegister((prev) => ({ ...prev, loading: true, invalidRegister: "" }));

    try {
      const response = await registerUser({
        userName: register.userName,
        email: register.email,
        password: register.password,
      });
      setRegister((prev) => ({
        ...prev,
        userId: response.userData.userId,
        loggedIn: true,
        loading: false,
      }));
    } catch (error) {
      setRegister((prev) => ({
        ...prev,
        invalidRegister: error.message,
        loading: false,
      }));
    }
  };

  return (
    <div className="login-container">
      {register.loggedIn ? <Navigate to={`/chat/${register.userId}`} /> : ""}
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Register to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              value={register.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={register.email}
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
              value={register.password}
              onChange={handleChange}
              required
            />
          </div>
          {register.invalidRegister && (
            <p className="error-message">{register.invalidRegister}</p>
          )}
          <button type="submit" className="login-button">
            {register.loading ? <span className="spinner"></span> : "Register"}
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
