import React from "react";
import './admin.css';
import img1 from '../images/admin.png';
import addnew from '../images/addnew.png';
import { Link } from 'react-router-dom'; 

function Admin() {
    return (
        <div>
            <header>
                <ul>
                    <div style={{ display: "flex" }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/applications">All Applications</Link></li>
                        <li><Link to="/notifications">Notifications</Link></li>
                        <li><Link to="/reverts">Reverts</Link></li>
                        <li><Link to="/accepted">Accepted</Link></li>
                    </div>
                    <button className="btn">Sign out</button>
                </ul>
            </header>

            <div>
                <img src={img1} alt="Admin" className="adm" />
            </div>

            <div className="sch">
                <h1>Applications For Schemes:</h1>
                <div>
                    <button className="btn2"><h3>Agriculture, Rural & Environment</h3></button>
                    <button className="btn2"><h3>Banking, Financial Services and Insurance</h3></button>
                    <button className="btn2"><h3>Business & Entrepreneurship</h3></button>
                    <button className="btn2"><h3>Education and Learning</h3></button>
                    <button className="btn2"><h3>Health & Wellness</h3></button>
                    <button className="btn2"><h3>Infrastructure & Transportation</h3></button>
                    <button className="btn2"><h3>Science & Technology</h3></button>
                    <button className="btn2"><h3>Tourism & Culture</h3></button>
                </div>
            </div>

            <div className="addNew">
                <img src={addnew} alt="Add New Scheme" className="newSch" />
                <div>
                    <button className="btn3"><h2>Add New Schemes</h2></button>
                </div>
                <button><Link to="/documents-required">Accepted</Link></button>
                <button><Link to="/schemeform">Scheme Form</Link></button>
                <li><Link to="/accepted">Accepted</Link></li>
                <li><Link to="/appliedschemes">Applied</Link></li>
            </div>
        </div>
    );
}

export default Admin;
