import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"; // Ensure you update or create a corresponding CSS file

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Track the current step of the sign-up process

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (step === 1) {
      // Handle user details submission
      console.log("Sign-up details:", { email, contact, password });

      try {
        // Send sign-up details to the backend and request OTP
        const response = await fetch("/api/signup", { // Replace with your actual API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, contact, password }),
        });
        const data = await response.json();
        console.log("OTP sent response:", data);
        
        if (response.ok) {
          setStep(2); // Move to OTP verification step
        } else {
          // Handle errors (e.g., sign-up errors)
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
          // Handle successful sign-up
          console.log("Sign-up successful");
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
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
                <label htmlFor="contact">Contact Number</label>
                <input
                  type="text"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
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
              <button type="submit" className="signup-button">
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
              <button type="submit" className="signup-button">
                Verify OTP
              </button>
            </>
          )}
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

export default SignUp;
