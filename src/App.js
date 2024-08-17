import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Faqs from './pages/Faqs';
import HowItWorks from './pages/HowItWorks';
import ContactUs from './pages/ContactUs';
import RoleSelection from "./pages/RoleSelection";
import AdminSignUp from './pages/AdminSignUp';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Category from './pages/Category';
import ApprovedSchemes from './pages/ApprovedSchemes';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/approvedSchemes" element={<ApprovedSchemes />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
