import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the custom hook
import "../Login.css"; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Access login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Use the login function from AuthContext
      setError(""); // Clear any previous error
      console.log("User logged in successfully");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container"> {/* Add the container class */}
      <h2>Login</h2>
      {error && <p>{error}</p>} {/* Error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
