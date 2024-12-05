import React, { useEffect, useState } from "react";
import { fetchQuestions, submitScore } from "../services/api";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import Leaderboard from "./Leaderboard"; // Import Leaderboard component
import "../Question.css";

const Question = ({ user }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizAttemptId, setQuizAttemptId] = useState(uuidv4()); // Generate unique ID for each quiz attempt

  // Fetch questions from the API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestions();
        setQuestions(response);
      } catch (err) {
        console.error("Failed to load questions", err);
      }
    };
    loadQuestions();
  }, []);

  // Handle answer submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isCorrect =
      answer.toLowerCase().trim() ===
      questions[currentQuestion]?.correct_answer?.toLowerCase().trim();

    if (isCorrect) {
      const newScore = totalScore + 50;
      setTotalScore(newScore);

      try {
        // Submit score with quiz_attempt_id
        await submitScore({ points: 50, quiz_attempt_id: quizAttemptId });
      } catch (err) {
        console.error("Error submitting score:", err);
      }
    }

    setAnswer("");
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizFinished(true); // End the quiz
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    setQuizAttemptId(uuidv4()); // Generate a new ID for the new quiz attempt
    setCurrentQuestion(0);
    setTotalScore(0);
    setQuizFinished(false);
    setAnswer("");
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div className="question-container">
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{questions[currentQuestion]?.content}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Your Score: {totalScore}</h3>
      </div>
      {quizFinished && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Quiz Finished!</h2>
            <p>Your final score: {totalScore}</p>
            <button onClick={handleRestart}>Restart Quiz</button>
          </div>
        </div>
      )}

      {/* Persistent Restart Button */}
      <button className="restart-button" onClick={handleRestart}>
        Restart Quiz
      </button>

      {/* Include Leaderboard */}
      <Leaderboard />
    </div>
  );
};

export default Question;
