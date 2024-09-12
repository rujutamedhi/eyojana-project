import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import Admin from './pages/admin';
import DocumentsRequired from './pages/DocumentsRequired';


// Move useLocation inside a separate component inside the Router
const MainApp = () => {
  const location = useLocation(); // Now this is inside Router context

  // List of paths where the Navbar should not be displayed
  const hideNavbarRoutes = ['/adminhome'];

  return (
    <div>
      {/* Conditionally render the Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

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
        <Route path="/adminhome" element={<Admin />} />
        <Route path="/documents-required" element={<DocumentsRequired />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainApp /> {/* Use the MainApp component inside Router */}
    </Router>
  );
}

export default App;
