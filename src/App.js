import React from "react";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";

export default function App() {
  /* State is responsible for starting the quiz
  false = load <Quiz />, true = load <StartQuiz /> */
  const [startState, setStartState] = React.useState(false);

  function loadQuiz() {
    setStartState((prevStart) => !prevStart);
  }

  return (
    <div className="quizzical">
      {startState ? <Quiz /> : <StartQuiz loadQuiz={loadQuiz} />}
    </div>
  );
}
