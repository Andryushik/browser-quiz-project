import { initWelcomePage } from './pages/welcomePage.js';
import { initQuestionPage } from './pages/questionPage.js';
import { getQuizData } from './utils/sessionStorage.js';

const savedQuizData = getQuizData();

const loadApp = () => {
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!savedQuizData) {
    initQuestionPage();
  } else {
    initWelcomePage();
  }
};

window.addEventListener('load', loadApp);
