import React from "react";
import './admin.css';
import { IoIosArrowRoundForward } from "react-icons/io";
function Admin(){
    return(
        <div>
            <div>
            <header>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">All Applications</a></li>
                <li><a href="#">Notifications</a></li>
                <li><a href="#">Reverts</a></li>
                <li><a href="#">Accepted</a></li>
                <button class="btn">Sign out</button>
            </ul>

            
        </header>
            </div>
        <div>
        <img src="admin.png" alt="Admin" className="adm"/>
        </div>
       
        <div class="sch">
            <h1 style={{color:"color: rgb(16, 77, 57)"}}>Applications For Schemes:</h1>
            <div>
            <button class="btn2"><h1>Agriculture,Rural & Environment</h1></button>
            <button class="btn2"><h1>Banking,Financial Services and Insurance</h1></button>
            <button class="btn2"><h1>Business & Entrepreneurship</h1></button>
            <button class="btn2"><h1>Education and Learning</h1></button>
            <button class="btn2"><h1>Health & Wellness</h1></button>
            <button class="btn2"><h1>Education</h1></button>
            <button class="btn2"><h1>Education</h1></button>
            <button class="btn2"><h1>Education</h1></button>
            </div>
            <div >
                
            </div>
        </div>
        <div className="addNew">
        <img src="addnew.png" alt="addnew" className="newSch"/>
        <div>
        <button class="btn3"><h2>Add New Schemes </h2></button>
        <IoIosArrowRoundForward size={50} color="#22a747"/>
        </div>
        </div>
        </div>

    )
}
export default Admin
