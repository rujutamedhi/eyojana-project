import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'; 
import '../components/navbar.css'; 
import eyojana from '../images/e-yojana.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#s">
          <img src={logo} alt="Logo" width="30" height="25" className="d-inline-block align-text-top"/>
          <img src={eyojana} alt="Logo" width="120" height="30" className="d-inline-block align-text-top ms-3"/>
          
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category">Categories</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/faqs">FAQS</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/HowItWorks">How it works</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ContactUs">Contact Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ApprovedSchemes">Approved Schemes</Link></li>
            <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <li className="nav-item"><Link className="nav-link" to="/HowItWorks">Login</Link></li>
      <li className="nav-item"><Link className="nav-link" to="/ContactUs">Sign up</Link></li>

            
          </ul>
      
      
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
