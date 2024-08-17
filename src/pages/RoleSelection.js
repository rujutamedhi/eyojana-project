import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    if (selectedRole === "user") {
      navigate("/SignUp");
    } else if (selectedRole === "admin") {
      navigate("/admin-signup");
    }
  };

  return (
    <div className="role-selection-page">
      <div className="role-selection-box">
        <h2>Select Your Role</h2>
        <div className="role-selection">
          <button onClick={() => handleRoleSelection("user")} className="role-button">
            User Sign Up
          </button>
          <button onClick={() => handleRoleSelection("admin")} className="role-button">
            Admin Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
