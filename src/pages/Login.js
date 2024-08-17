import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Simple client-side validation
    if (!email || !password) {
      console.error("Email and password are required.");
      return;
    }

    console.log("Login details:", { email, password });

    // You can add further logic to handle login here (e.g., form submission)
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <div className="signup-link">
          <p>
            New user? <Link to="/role-selection">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
