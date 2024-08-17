import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();

    // Simple client-side validation
    if (!email || !contact || !password || !username || !state || !gender) {
      console.error("All fields are required.");
      return;
    }

    console.log("Sign-up details:", { email, contact, password, username, state, gender });

    // Redirect to user dashboard or another page after sign-up
    navigate("/user-dashboard"); // Adjust this route based on your app
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>User Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              pattern="^[1-9][0-9]{9}$" // Pattern for a 10-digit phone number
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
          <div className="input-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
