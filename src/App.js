import React from "react";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false); //change back to false
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);

  // console.log(questions);

  const quizElements = questions.map((question) => {
    return (
      <Quiz
        key={question.id}
        id={question.id}
        question={question.title}
        answers={question.answers}
        correctAnswer={question.correctAnswer}
        isSelected={question.isSelected}
      />
    );
  });

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((question) => {
            return {
              id: nanoid(),
              title: question.question,
              answers: question.incorrect_answers.concat(
                question.correct_answer
              ),
              correctAnswer: question.correct_answer,
              isSelected: false,
            };
          })
        )
      );
  }, []);

  function loadQuiz() {
    setStartQuiz((prevStart) => !prevStart);
  }

  return (
    <div className="quizzical">
      {startQuiz ? (
        <div className="quiz">
          {quizElements}
          <div className="button-container">
            <button className="quiz-button">Check answers</button>
          </div>
        </div>
      ) : (
        <StartQuiz loadQuiz={loadQuiz} />
      )}
    </div>
  );
}
