import React from "react";
import './admin.css';
import img1 from '../images/adminhome.png';
// import addnew from '../images/addnew.png';
import { Link } from 'react-router-dom';
// import { AuthProvider } from "../components/AuthContext";
// import { useAuth } from "../components/AuthContext";


const categories = [
    { text: "Agriculture, Rural & Environment" },
    { text: "Banking, Financial Services and Insurance"},
    { text: "Business & Entrepreneurship" },
    { text: "Education & Learning"},
    { text: "Health & Wellness"},
    { text: "Housing & Shelter"},
    { text: "Public Safety, Law & Justice"},
    { text: "Science, IT & Communications"},
    { text: "Skills & Employment"},
    { text: "Social welfare & Empowerment"},
    { text: "Sports & Culture" },
    { text: "Transport & Infrastructure"},
    { text: "Travel & Tourism" },
    { text: "Utility & Sanitation"},
    { text: "Women and Child"}
];

function Admin() {
    return (
        <div>
            <header>
                <ul>
                    <div style={{ display: "flex" }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/appliedschemes">All Applications</Link></li>
                        <li><Link to="/notifications">Notifications</Link></li>
                        <li><Link to="/reverts">Reverts</Link></li>
                        <li><Link to="/accepted">Accepted</Link></li>
                    </div>
                    <Link to="/">
                    <button className="btn">Sign out</button></Link>
                </ul>
            </header>

            <div>
                <img src={img1} alt="Admin" className="adm" />
            </div>
<br>
</br>
            <div className="sch">
                <h3 align="center">Applications For Schemes:</h3>
                <div className="cat">
                    {categories.map((category, index) => (
                        
                        <button key={index} className="btn2" >
                            
                            <h4>{category.text}</h4>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Admin;

