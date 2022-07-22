import React from "react";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false); //change back to false
  const [showQuizAnswers, setShowQuizAnswers] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);

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
              selectedAnswer: "",
              isAnswered: false,
            };
          })
        )
      );
  }, []);

  console.info(questions);

  function loadQuiz() {
    setStartQuiz((prevStart) => !prevStart);
  }

  function showAnswers() {
    setShowQuizAnswers((prevShow) => !prevShow);
  }

  /* this function is for:
  - updating questions state (selectedAnswer, and isAnswered)
  */
  function handleSelectAnswer(id, answer) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            selectedAnswer: answer,
            // isAnswered: true,
          };
        } else {
          return question;
        }
      });
    });
  }

  const quizElements = questions.map((question) => {
    return (
      <Quiz
        key={question.id}
        id={question.id}
        question={question.title}
        correctAnswer={question.correctAnswer}
        answers={question.answers}
        selectedAnswer={question.selectedAnswer}
        showQuizAnswers={showQuizAnswers}
        handleSelectAnswer={handleSelectAnswer}
      />
    );
  });

  return (
    <div className="quizzical">
      {startQuiz ? (
        <div className="quiz">
          {quizElements}
          <div className="button-container">
            <button className="quiz-button" onClick={showAnswers}>
              Check answers
            </button>
          </div>
        </div>
      ) : (
        <StartQuiz loadQuiz={loadQuiz} />
      )}
    </div>
  );
}
