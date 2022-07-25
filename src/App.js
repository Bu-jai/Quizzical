import React from "react";
import StartQuiz from "./components/StartQuiz";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [startQuiz, setStartQuiz] = React.useState(true); //change back to false
  const [showQuizAnswers, setShowQuizAnswers] = React.useState(false);
  const [allAnswered, setAllAnswered] = React.useState(false);
  const [resetPromt, setResetPrompt] = React.useState(false);
  const [fetchQuestions, setFetchQuestions] = React.useState(false); // value doesn't matter, just used to trigger the useEffect
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log(questions);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        return setQuestions(
          data.results.map((question) => {
            // make sure in True/false questions, "True" is always the first option and "False" is always the second option
            let answers = question.incorrect_answers.concat(
              question.correct_answer
            );

            if (question.correct_answer === "True") {
              const temp = [question.correct_answer];
              answers = temp.concat(question.incorrect_answers);
            } else if (question.correct_answer === "False") {
              answers = question.incorrect_answers.concat(
                question.correct_answer
              );
            } else {
              answers = shuffleAnswer(answers);
            }

            return {
              id: nanoid(),
              title: question.question,
              answers: answers,
              correctAnswer: question.correct_answer,
              selectedAnswer: "",
              isAnswered: false,
            };
          })
        );
      });
  }, [fetchQuestions]);

  // Shuffle the answers
  function shuffleAnswer(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // Puts the selected answer into the selectedAnswer property of the question object
  function handleSelectAnswer(id, answer) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            selectedAnswer: answer,
            isAnswered: true,
          };
        } else {
          return question;
        }
      });
    });
  }

  // Counts the number of correct answers & determines if the user can submit the quiz
  function setUserScore() {
    let answeredQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].isAnswered === true) {
        answeredQuestion++;
      }
    }
    if (answeredQuestion === questions.length) {
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].selectedAnswer === questions[i].correctAnswer) {
          setScore((prevScore) => prevScore + 1);
        }
      }
      setAllAnswered((prevAllAnswered) => !prevAllAnswered);
      setShowQuizAnswers((prevShow) => !prevShow);
      setResetPrompt((prevReset) => !prevReset);
    } else {
      alert("You must answer all questions. 📚");
    }
  }

  // Resets the quiz
  function resetQuiz() {
    setShowQuizAnswers((prevShow) => !prevShow);
    setResetPrompt((prevReset) => !prevReset);
    setAllAnswered((prevAllAnswered) => !prevAllAnswered);
    setFetchQuestions((prevFetch) => !prevFetch);
    setScore(0);
  }

  function loadQuiz() {
    setStartQuiz((prevStart) => !prevStart);
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
      {score >= 4 && <Confetti width={width} height={height} />}
      {startQuiz ? (
        <div className="quiz">
          {quizElements}
          {resetPromt && allAnswered ? (
            <div className="score-container">
              <div className="quiz-score">
                <h3 className="user-score">{`You scored ${score}/${questions.length} correct answers`}</h3>
                <div className="button-container">
                  <button className="quiz-button" onClick={resetQuiz}>
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="button-container">
              <button className="quiz-button" onClick={setUserScore}>
                Check answers
              </button>
            </div>
          )}
        </div>
      ) : (
        <StartQuiz loadQuiz={loadQuiz} />
      )}
    </div>
  );
}
