import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Question from "./components/Question";
import Leaderboard from "./components/Leaderboard";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Header from "./components/Header"; // Import the Header component

const AppRoutes = () => {
  const { user } = useAuth(); // Get the user from AuthContext

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/questions" replace /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/questions" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/questions" replace /> : <SignUp />}
        />
        <Route
          path="/questions"
          element={user ? <Question /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/leaderboard"
          element={user ? <Leaderboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Add Header component here */}
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
