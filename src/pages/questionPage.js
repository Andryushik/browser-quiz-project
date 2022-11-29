import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener('click', showAnswer);

    function showAnswer() {
      //check if answer is not given before
      if (currentQuestion.selected !== true) {
        currentQuestion.selected = true;
        if (currentQuestion.correct === key) {
          // 1. if the answer is Correct, the answer will turn Green
          answerElement.style.color = 'green'; //>>> To be replaced with Css Styling when ready // answerElement.className = '.correct'
        } else {
          // 1. if the answer is Wrong, the answer will turn Red
          answerElement.style.color = 'red'; //>>> To be replaced with Css Styling when ready // answerElement.className = '.wrong'

          //get all li elements
          for (const answer of currentQuestion.answers) {
            // check which one is correct answer
            if (key == currentQuestion.correct) {
              // show the correct answer
              answer.style.color = 'green';
            }
          }
        }
      }
    }
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};
