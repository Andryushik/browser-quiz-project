import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { showCorrectAnswer } from '../utils/showCorrectAnswerUtil.js';

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
    answerElement.addEventListener('click', () => {
      showCorrectAnswer(answerElement, key, currentQuestion);
    });
  }
  const nextQuestionCheck = () => {
    const links = document.getElementById('links-div').childNodes.length;
    if (links === 0) {
      for (const [key, answerText] of Object.entries(currentQuestion.correct)) {
        const answerElement = createAnswerElement(key, answerText);
        showCorrectAnswer(answerElement, key, currentQuestion);
      }
    } else {
      nextQuestion();
    }
  };
  
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestionCheck);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  initQuestionPage();
};
