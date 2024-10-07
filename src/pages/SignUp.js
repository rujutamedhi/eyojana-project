// // UserSignUp.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./SignUp.css";
// import Login from "./Login";

// const UserSignUp = () => {
//   const [email, setEmail] = useState("");
//   const [phone_number, setphone_number] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [state, setState] = useState("");
//   const [gender, setGender] = useState("");
//   const navigate = useNavigate();

//   const handleSignUp = async (event) => {
//     event.preventDefault();

//     // Client-side validation
//     if (!email || !phone_number || !password || !username || !state || !gender) {
//       console.error("All fields are required.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/createuser", { // Use your backend port
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           phone_number,
//           password,
//           username,
//           state,
//           gender,
//         }),
//       });
      
   

//       const data = await response.json();

//       if (response.ok) {
//         console.log("User registered successfully:", data);
//         navigate("/login"); // Redirect to login after successful signup
//       } else {
//         console.error("Sign-up failed:", data.errors);
//       }
//     } catch (error) {
//       console.error("Sign-up error:", error);
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="signup-box">
//         <h2>User Sign Up</h2>
//         <form onSubmit={handleSignUp}>
//           <div className="input-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="phone_number">phone_number </label>
//             <input
//               type="text"
//               id="phone_number"
//               value={phone_number}
//               onChange={(e) => setphone_number(e.target.value)}
//               required
//               pattern="^[1-9][0-9]{9}$" // Validation for 10-digit phone number
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="state">State</label>
//             <input
//               type="text"
//               id="state"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="gender">Gender</label>
//             <input
//               type="text"
//               id="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="signup-button">
//             Sign Up
//           </button>
//         </form>
//         <div className="login-link">
//           <p>
//             Already have an account? <Link to="/login">Log in</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSignUp;

// UserSignUp.js
// UserSignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Client-side validation
    if (!email || !phone_number || !password || !username || !state || !gender) {
      console.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
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
        setShowPopup(true); // Show the popup
        setTimeout(() => {
          setShowPopup(false);
          navigate("/login"); // Redirect to login after a short delay
        }, 3000); // Adjust delay as needed
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
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select your state</option>
              {/* Add your states here */}
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
      {showPopup && (
        <div className="popup">
          <h2>Account Created Successfully!</h2>
          <p>You can now log in with your credentials.</p>
        </div>
      )}
    </div>
  );
};

export default UserSignUp;
