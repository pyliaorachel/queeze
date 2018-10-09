import { combineReducers } from 'redux';
import auth from './auth';
import quiz from './quiz';

const rootReducer = combineReducers({
  auth,
  quiz,
});

export default rootReducer;