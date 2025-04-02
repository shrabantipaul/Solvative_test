import React, { useState } from "react";
import { QuizApp } from "./index";
import { questions } from "./questions";

export const QuizWrapper = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [foundQuestions, setFoundQuestions] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = Object.keys(
      Object.fromEntries(new FormData(e.currentTarget))
    )[0];
    const findID = questions.categories.find((value) => value.id === selected);
    setFoundQuestions(findID.questions);
  };
  return (
    <>
    <header class="quiz-header">
        <div class="logo">QUIZ<span>Mania</span></div>
        {name.length&&foundQuestions?.length ? <div class="user-profile">
            <div class="avatar">{name[0].toUpperCase()}</div>
            <span class="username">{name}</span>
        </div> : null}
    </header>
      {!foundQuestions ? (
        <WelcomeQuiz
          name={name}
          setName={setName}
          topic={topic}
          setTopic={setTopic}
          handleSubmit={handleSubmit}
        />
      ) : (
        <QuizApp questions={foundQuestions} />
      )}
    </>
  );
};
const WelcomeQuiz = ({ name, setName, topic, setTopic, handleSubmit }) => {
  return (
    <div className="welcome-container">
      <h1>
        Welcome to <span className="highlight">QUIZ</span>Mania
      </h1>
      <div className="rules-section">
        <p>Please read ALL the rules about the quiz before you start.</p>
        <button className="rules-button">Quiz rules</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <p>Please select topic to continue</p>
          <div className="options">
            <label>
              <input
                type="radio"
                value="Javascript Basic"
                name="js_basics"
                checked={topic === "Javascript Basic"}
                onChange={(e) => setTopic(e.target.value)}
              />
              Javascript Basic
            </label>
            <label>
              <input
                type="radio"
                value="Angular Basic"
                name="ang"
                checked={topic === "Angular Basic"}
                onChange={(e) => setTopic(e.target.value)}
              />
              Angular Basic
            </label>
            <label>
              <input
                type="radio"
                value="React.js Advance"
                name="react"
                checked={topic === "React.js Advance"}
                onChange={(e) => setTopic(e.target.value)}
              />
              React.js Advance
            </label>
            <label>
              <input
                type="radio"
                value="Flutter"
                name="flutter"
                checked={topic === "Flutter"}
                onChange={(e) => setTopic(e.target.value)}
              />
              Flutter
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="start-button"
          disabled={!topic.length || !name.length}
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};
