import {
  REQUEST_LOGIN, RECEIVE_LOGIN, LOGIN_FAILED,
  LOGOUT,
  REQUEST_REGISTER, RECEIVE_REGISTER, REGISTER_FAILED,
  REQUEST_VALIDATE_TOKEN, TOKEN_VALIDATED, TOKEN_INVALID 
} from '../actions/auth';

const initialState = {
  isValidatingToken: true,
  isLoggingIn: false,
  isRegisterring: false,
  token: '',
};

function auth(state = initialState, action) {
  if (!action) return state;
  switch (action.type) {
    /* Token */
    case REQUEST_VALIDATE_TOKEN:
      return Object.assign({}, state, {
        isValidatingToken: true,
      });
      break;
    case TOKEN_VALIDATED:
      return Object.assign({}, state, {
        isValidatingToken: false,
        token: action.token,
      });
      break;
    case TOKEN_INVALID:
      return Object.assign({}, state, {
        isValidatingToken: false,
        token: '',
      });
      break;

    /* Login */
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isLoggingIn: true,
      });
      break;
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isLoggingIn: false,
        token: action.token,
      });
      break;
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoggingIn: false,
        token: '',
      });
      break;

    /* Logout */
    case LOGOUT:
      return Object.assign({}, state, {
        token: '',
      });
      break;

    /* Register */
    case REQUEST_REGISTER:
      return Object.assign({}, state, {
        isRegisterring: true,
      });
      break;
    case RECEIVE_REGISTER:
      return Object.assign({}, state, {
        isRegisterring: false,
        token: action.token,
      });
      break;
    case REGISTER_FAILED:
      return Object.assign({}, state, {
        isRegisterring: false,
        token: '',
      });
      break;
    default:
      return state;
  }
}

export default auth;