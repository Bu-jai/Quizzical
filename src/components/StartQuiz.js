import React from "react";

export default function StartQuiz(props) {
  return (
    <div className="start">
      <h1 className="start-title">Quizzical</h1>
      <h4 className="start-description">
        Answer 5 questions to see if you can be a Quizzical Champion!
      </h4>
      <button className="start-button" onClick={props.loadQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
