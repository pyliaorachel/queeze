import { REQUEST_QUIZ_LIST, RECEIVE_QUIZ_LIST, REQUEST_QUIZ, RECEIVE_QUIZ } from '../actions/quiz';

const initialState = {
  isRequestingQuizList: false,
  quizList: [],
  questionList: {},
};

function quiz(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUIZ_LIST:
      return Object.assign({}, state, {
        isRequestingQuizList: true,
      });
      break;
    case RECEIVE_QUIZ_LIST:
      return Object.assign({}, state, {
        isRequestingQuizList: false,
        quizList: action.quizList,
      });
      break;
    case REQUEST_QUIZ:
      return Object.assign({}, state, {
        questionList: Object.assign({}, state.questionList, {
          [action.quizName]: null,
        }),
      });
      break;
    case RECEIVE_QUIZ:
      return Object.assign({}, state, {
        questionList: Object.assign({}, state.questionList, {
          [action.quizName]: action.quiz,
        }),
      });
      break;
    default:
      return state;
  }
}

export default quiz;