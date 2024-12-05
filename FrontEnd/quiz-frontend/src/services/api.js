import axios from "axios";

// Create an Axios instance for API communication
const api = axios.create({
  baseURL: "http://localhost:4001", // Rails backend URL
  withCredentials: true, // Include cookies for session-based authentication
});

// Utility function for error handling
const handleApiError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error; // Rethrow for handling in the calling function
};

// Fetch questions from the API
export const fetchQuestions = async () => {
  try {
    const response = await api.get("/api/questions");
    console.log("Questions fetched successfully:", response.data);
    return response.data; // Return questions data
  } catch (error) {
    handleApiError(error);
  }
};

// Submit a score for a user
export const submitScore = async ({ points, quiz_attempt_id }) => {
  try {
    const response = await api.post("/api/scores", { 
      score: { points, quiz_attempt_id } 
    });
    console.log("Score submission successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting score:", error.response?.data || error.message);
    throw error;
  }
};


// Fetch the leaderboard *(top 10 scores)*
export const fetchLeaderboard = async () => {
  try {
    const response = await api.get("/api/scores/leaderboard");
    console.log("Leaderboard fetched successfully:", response.data);
    return response.data; // Return leaderboard data
  } catch (error) {
    handleApiError(error);
  }
};

// Log in a user
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/users/sign_in", {
      user: { username, password }, // Ensure "user" key wraps the credentials
    });
    console.log("User logged in successfully:", response.data);
    return response.data; // Return the user data
  } catch (error) {
    handleApiError(error);
  }
};

// Register a new user
export const registerUser = async (username, password, passwordConfirmation) => {
  try {
    const response = await api.post("/users", {
      user: { username, password, password_confirmation: passwordConfirmation },
    });
    console.log("User registered successfully:", response.data);
    return response.data; // Return server response
  } catch (error) {
    handleApiError(error);
  }
};

// Log out the current user
export const logoutUser = async () => {
  try {
    await api.delete("/users/sign_out");
    console.log("User logged out successfully");
    return true; // Return true on successful logout
  } catch (error) {
    handleApiError(error);
  }
};

// Utility to fetch the current user (if session exists)
export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/users/current_user");
    console.log("Current user fetched successfully:", response.data);
    return response.data; // Return the current user data
  } catch (error) {
    handleApiError(error);
  }
};

export default api;
