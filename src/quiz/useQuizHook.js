import React, { useState, useEffect } from "react";
// import { questions } from "./questions";

export const useQuizHook = (questions) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(questions[0].timeLimit);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const answered = React.useRef(0);
  
    useEffect(() => {
      if (timeLeft > 0 && !quizCompleted) {
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else if (timeLeft === 0) {
        handleNextQuestion();
      }
    }, [timeLeft, quizCompleted]);
  
    const handleAnswer = (answer) => {
      ++answered.current;
      setSelectedAnswer(answer);
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    };
  
    const handleNextQuestion = () => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(questions[currentQuestion + 1].timeLimit);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    };
  
    const restartQuiz = () => {
      setCurrentQuestion(0);
      setScore(0);
      setTimeLeft(questions[0].timeLimit);
      setQuizCompleted(false);
      setSelectedAnswer(null);
      answered.current = 0
    };

    return {
        restartQuiz,
        handleNextQuestion,
        handleAnswer,
        selectedAnswer,
        answered,
        quizCompleted,
        timeLeft,
        score,
        currentQuestion,
    }
}