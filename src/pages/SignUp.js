// UserSignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import Login from "./Login";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!email || !phone_number || !password || !username || !state || !gender) {
      console.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", { // Use your backend port
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone_number,
          password,
          username,
          state,
          gender,
        }),
      });
      
   

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        navigate("/login"); // Redirect to login after successful signup
      } else {
        console.error("Sign-up failed:", data.errors);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
    }
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
            <label htmlFor="phone_number">phone_number </label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setphone_number(e.target.value)}
              required
              pattern="^[1-9][0-9]{9}$" // Validation for 10-digit phone number
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
