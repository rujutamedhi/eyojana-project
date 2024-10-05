// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../images/logo.png'; 
// import './navbar.css'; 
// import eyojana from '../images/e-yojana.png';

// function Navbar() {

//   const navigate = useNavigate(); // Hook for navigation in React Router

//   const navigateToSection = (section) => {
//     // If not on the home page, navigate to home page first
//     if (window.location.pathname !== '/') {
//       navigate('/'); // Redirect to home page
//     }
    
//     // Scroll to the section after redirection
//     setTimeout(() => {
//       document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
//     }, 100); // Slight delay to ensure home page is fully loaded before scrolling
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-content">
//         <div className="logo">
//           <a className="navbar-brand" href="#s">
//             <img id="emblem" src={logo} alt="Logo"  className="d-inline-block align-text-top"/>
//             <img src={eyojana} alt="Logo" width="120" height="30" className="d-inline-block align-text-top ms-3"/>
//           </a>
//         </div>
//         <div className="nav-links">
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/category">Schemes</Link></li>
//             <li><a href="#about" onClick={() => navigateToSection('about')}>About</a></li>
//             <li><a href="#faq" onClick={() => navigateToSection('faq')}>FAQs</a></li>
//             <li><a href="#contact" onClick={() => navigateToSection('contact')}>Contact Us</a></li>
//             <li><Link to="/ApprovedSchemes">Approved Schemes</Link></li>
//             <li>
//               <Link to="/login">
//                 <button id="loginbutton" className="btn">Login</button>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }


// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'; 
import './navbar.css'; 
import eyojana from '../images/e-yojana.png';
import { AuthProvider } from "../components/AuthContext";
import { useAuth } from "../components/AuthContext";

function Navbar() {

  const navigate = useNavigate(); // Hook for navigation in React Router
  const { isLoggedIn } = useAuth();
const { setIsLoggedIn } = useAuth();

const handleLogout = () => {
  // Clear the token and reset login state
  localStorage.removeItem("authToken");
 // localStorage.removeItem("Email");
  setIsLoggedIn(false);
  alert("are you sure you want to logout?")
  navigate("/login"); // Redirect to login page after logout
};

  const logout = (setIsLoggedIn) =>{
    setIsLoggedIn(false);
  }
  const navigateToSection = (section) => {
    // If not on the home page, navigate to home page first
    if (window.location.pathname !== '/') {
      navigate('/'); // Redirect to home page
    }
    
    // Scroll to the section after redirection
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Slight delay to ensure home page is fully loaded before scrolling
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <a className="navbar-brand" href="#s">
            <img id="emblem" src={logo} alt="Logo" className="d-inline-block align-text-top" />
            <img src={eyojana} alt="Logo" width="120" height="30" className="d-inline-block align-text-top ms-3"/>
          </a>
        </div>

        <div className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Schemes</Link></li>
            <li><a href="#about" onClick={() => navigateToSection('about')}>About</a></li>
            <li><a href="#faq" onClick={() => navigateToSection('faq')}>FAQs</a></li>
            <li><a href="#contact" onClick={() => navigateToSection('contact')}>Contact Us</a></li>
            <li><Link to="/ApprovedSchemes">Approved Schemes</Link></li>
          </ul>
        </div>

        <div className="nav-login">
          {!isLoggedIn?(<Link to="/login">
            <button id="loginbutton" className="btn">Login</button>
          </Link>):(
            <Link to="/">
            <button id="loginbutton" onClick={handleLogout} className="btn">LogOut</button>
          </Link>
          )}
          
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
