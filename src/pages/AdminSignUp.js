import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSignUp.css"; // Make sure to create this CSS file or adjust your existing one

const AdminSignUp = () => {
  const [adminname, setAdminname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adminCode, setAdminCode] = useState(""); // Additional field for admin sign-up

  const handleAdminSignUp = async (event) => {
    event.preventDefault();

    if (!adminname || !email || !password || !phoneNumber || !adminCode) {
      console.error("All fields are required.");
      return;
    }

    console.log("Admin sign-up details:", { adminname, email, password, phoneNumber, adminCode });

    // Implement sign-up logic for admins, such as an API call
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Admin Sign Up</h2>
        <form onSubmit={handleAdminSignUp}>
          <div className="input-group">
            <label htmlFor="adminname">Admin Name</label>
            <input
              type="text"
              id="adminname"
              value={adminname}
              onChange={(e) => setAdminname(e.target.value)}
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
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="adminCode">Admin Code</label>
            <input
              type="text"
              id="adminCode"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
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

export default AdminSignUp;
