import React from "react";

export default function Quiz(props) {
  function findStyle(selectedAns, index) {
    if (props.showQuizAnswers) {
      if (
        selectedAns === props.correctAnswer &&
        index === props.correctAnswer
      ) {
        return {
          backgroundColor: "#94D7A2",
          border: "none",
        };
      } else if (selectedAns === index) {
        return {
          backgroundColor: "#F8BCBC",
          border: "none",
          opacity: 0.5,
        };
      }
    } else if (selectedAns === index) {
      return {
        backgroundColor: "#D6DBF5",
        border: "none",
      };
    }
  }

  // props.answers[index] determines the answer based on the answers array in the question object
  const answers = props.answers.map((answer, index) => {
    return (
      <button
        key={index}
        className="quiz-answer"
        style={findStyle(props.selectedAnswer, props.answers[index])}
        onClick={() => props.handleSelectAnswer(props.id, props.answers[index])}
      >
        {answer}
      </button>
    );
  });

  return (
    <div>
      <h2 className="quiz-question">{props.question}</h2>
      <div className="answers">{answers}</div>
      <hr className="separator" />
    </div>
  );
}
