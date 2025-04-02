import React from "react";
import { useQuizHook } from "./useQuizHook";

export const QuizApp = ({ questions }) => {
  const {
    restartQuiz,
    handleNextQuestion,
    handleAnswer,
    selectedAnswer,
    answered,
    quizCompleted,
    timeLeft,
    score,
    currentQuestion,
  } = useQuizHook(questions);

  if (quizCompleted) {
    return (
      <div class="container">
        <div class="checkmark">✔</div>
        <h1 class="congratulations">
          {((score / questions.length) * 100).toFixed(2) > 40
            ? "CONGRATULATION"
            : "KEEP PRACTICING!"}
        </h1>
        <p class="message">You successfully completed the Quiz and holds</p>
        <h2 class="score-label">Your Score</h2>
        <p class={((score / questions.length) * 100).toFixed(2) >50 ? "correct score" : "incorrect score"}>{((score / questions.length) * 100).toFixed(2)}%</p>
        {(((score / questions.length) * 100).toFixed(2) > 70)&& <p class="great-job">Great job!</p>}
        <div class="stats">
          <p>Out of {questions.length} question</p>
          <div class="stats-details">
            <span class="correct">{score} Correct</span>
            <span class="incorrect">{questions.length - (score+(questions.length - answered.current))} Incorrect</span>
            <span class="not-answered">{questions.length - answered.current} Not answered</span>
          </div>
        </div>
        <button class="retake-btn" onClick={restartQuiz}>Retake Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Quiz Application</h1>
      <div className="quiz-header">
        <p>
          {currentQuestion + 1} / {questions.length}
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <p className="timer">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>
      <div className="question-section">
        <h2>
          {currentQuestion + 1}. {questions[currentQuestion].question}
        </h2>
        <div className="answer-options">
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className="answer-option-label">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div className="button-section">
          {selectedAnswer && (
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion + 1 === questions.length ? "Finish" : "Next"}
            </button>
          )}
          <button onClick={handleNextQuestion} className="skip-button">
            Skip this question
          </button>
        </div>
      </div>
    </div>
  );
};
