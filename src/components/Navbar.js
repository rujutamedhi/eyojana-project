import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'; 
import './navbar.css'; 
import eyojana from '../images/e-yojana.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <a className="navbar-brand" href="#s">
            <img src={logo} alt="Logo" width="30" height="35" className="d-inline-block align-text-top"/>
            <img src={eyojana} alt="Logo" width="120" height="30" className="d-inline-block align-text-top ms-3"/>
          </a>
        </div>
        <div className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category">Schemes</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#faq">FAQs</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><Link to="/ApprovedSchemes">Approved Schemes</Link></li>
            <li>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
