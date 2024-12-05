import React, { useEffect, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { fetchLeaderboard } from "../services/api"; // Import the fetchLeaderboard API function

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch the initial leaderboard data
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching initial leaderboard:", error);
      }
    };

    loadLeaderboard();

    // Create ActionCable consumer for real-time updates
    const cable = createConsumer("ws://localhost:4001/cable");

    // Subscribe to leaderboard_channel
    const subscription = cable.subscriptions.create("LeaderboardChannel", {
      received: (data) => {
        console.log("Received leaderboard update:", data);
        if (data.leaderboard) {
          setLeaderboard(data.leaderboard); // Update the leaderboard with real-time data
        }
      },
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!leaderboard || leaderboard.length === 0) {
    return <div>Loading leaderboard...</div>;
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.points || entry.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
