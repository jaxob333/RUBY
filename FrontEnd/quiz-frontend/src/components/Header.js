import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#f4f4f4" }}>
      <h1>Quiz App</h1>
      {user && (
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
