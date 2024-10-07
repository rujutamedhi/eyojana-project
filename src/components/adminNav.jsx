import React from "react";
import '../pages/admin.css';
import img1 from '../images/adminhome.png';
// import addnew from '../images/addnew.png';
import { Link } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";

const AdminNav = () => {
    return (
        <div>
            <ul>
                    <div style={{ display: "flex" }}>
                        <li><Link to="/adminhome">Home</Link></li>
                        <li><Link to="/adminhome/appliedschemes">All Applications</Link></li>
                        <li><Link to="/adminhome/notifications">Notifications</Link></li>
                        <li><Link to="/adminhome/revertedschemes">Reverts</Link></li>
                        <li><Link to="/adminhome/approvedschemes">Approved</Link></li>
                    </div>
                    <Link to="/">
                    <button className="btn">Sign out</button></Link>
                </ul>
        </div>
        )};

export default AdminNav;