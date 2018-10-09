import {
  REQUEST_QUIZ_LIST, RECEIVE_QUIZ_LIST, REQUEST_QUIZ, RECEIVE_QUIZ,
  QUIZ_CREATED, QUIZ_EDITTED, QUIZ_DELETED,
} from '../actions/quiz';

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
    case QUIZ_CREATED:
      return Object.assign({}, state, {
        questionList: Object.assign({}, state.questionList, {
          [action.quizName]: action.quiz,
        }),
      });
      break;
    case QUIZ_EDITTED:
      if (action.oldQuizName !== action.newQuizName)
        return Object.assign({}, state, {
          questionList: Object.assign({}, state.questionList, {
            [action.oldQuizName]: null,
            [action.newQuizName]: action.quiz,
          }),
        });
      else
        return Object.assign({}, state, {
          questionList: Object.assign({}, state.questionList, {
            [action.newQuizName]: action.quiz,
          }),
        });
      break;
    case QUIZ_DELETED:
      return Object.assign({}, state, {
        questionList: Object.assign({}, state.questionList, {
          [action.quizName]: null,
        }),
      });
      break;
    default:
      return state;
  }
}

export default quiz;