import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, logoutUser, registerUser } from "../services/api"; // Import necessary API functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user from localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      setUser(response.user); // Assuming `response.user` is returned from the backend
      localStorage.setItem("user", JSON.stringify(response.user)); // Store user in localStorage
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow to handle errors in the calling component
    }
  };

  const register = async (username, password, passwordConfirmation) => {
    try {
      // Call API for user registration
      const response = await registerUser(username, password, passwordConfirmation);
      console.log("User registered successfully:", response);
      return response; // Return response for feedback in the component
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Rethrow to handle errors in the calling component
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Call API to handle server-side logout
      setUser(null); // Clear user state
      localStorage.removeItem("user"); // Clear user data from localStorage
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
