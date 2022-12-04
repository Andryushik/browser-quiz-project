import { initWelcomePage } from './pages/welcomePage.js';
import { initQuestionPage } from './pages/questionPage.js';
import { getQuizData } from './utils/sessionStorage.js';

const savedQuizData = getQuizData();

const loadApp = () => {
  if (savedQuizData === null) {
    initWelcomePage();
  } else {
    initQuestionPage();
  }
};

window.addEventListener('load', loadApp);
