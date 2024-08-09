import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Track the current step of the login process

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate that email is provided
    if (!email) {
      console.error("Please provide an email address.");
      return;
    }

    if (step === 1) {
      // Handle email and password submission
      console.log("Login details:", { email, password });

      try {
        // Send login details to the backend and request OTP
        const response = await fetch("/api/send-otp", { // Replace with your actual API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log("OTP sent response:", data);
        
        if (response.ok) {
          setStep(2); // Move to OTP verification step
        } else {
          // Handle errors (e.g., invalid credentials)
          console.error("Error sending OTP:", data.message);
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    } else if (step === 2) {
      // Handle OTP verification
      console.log("OTP:", otp);

      try {
        // Verify OTP with the backend
        const response = await fetch("/api/verify-otp", { // Replace with your actual API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        });
        const data = await response.json();
        console.log("OTP verification response:", data);
        
        if (response.ok) {
          // Handle successful login
          console.log("Login successful");
        } else {
          // Handle OTP verification errors
          console.error("Error verifying OTP:", data.message);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          {step === 1 && (
            <>
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
                Submit
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="input-group">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Verify OTP
              </button>
            </>
          )}
        </form>
        <div className="signup-link">
          <p>
            New user? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
