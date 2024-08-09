import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'; 
import '../components/navbar.css'; 
import eyojana from '../images/e-yojana.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home">
          <img src={logo} alt="Logo" width="30" height="25" className="d-inline-block align-text-top"/>
          <img src={eyojana} alt="E-Yojana" width="120" height="30" className="d-inline-block align-text-top ms-3"/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faqs">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/how-it-works">How It Works</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/approved-schemes">Approved Schemes</Link>
            </li>
            <li className="nav-item">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Sign In</Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/sign-up">Sign Up</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
