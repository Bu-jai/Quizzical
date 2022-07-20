import React from "react";

export default function Quiz(props) {
  const answers = props.answers.map((answer) => {
    return <button className="quiz-answer">{answer} </button>;
  });

  return (
    <div>
      <h2 className="quiz-question">{props.question}</h2>
      <div className="answers">{answers}</div>
      <hr className="separator" />
    </div>
  );
}

/* <h2 className="quiz-question">How would one say goodbye in Spanish?</h2>
<div className="answers">
  <button className="quiz-answer">Adios</button>
  <button className="quiz-answer">Hola</button>
  <button className="quiz-answer">Au Revoir</button>
  <button className="quiz-answer">Ciao</button>
</div>
<hr className="separator" /> */
