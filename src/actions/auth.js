import * as api from '../utils/api';
import * as consts from '../utils/const';

/* Token */

export const REQUEST_VALIDATE_TOKEN = 'REQUEST_VALIDATE_TOKEN';
export const TOKEN_VALIDATED = 'TOKEN_VALIDATED';
export const TOKEN_INVALID = 'TOKEN_INVALID';

function storeToken(token) {
  localStorage.setItem(consts.TOKEN_STORE_KEY, token);
}

function getToken() {
  return localStorage.getItem(consts.TOKEN_STORE_KEY);
}

function clearToken() {
  localStorage.removeItem(consts.TOKEN_STORE_KEY);
}

function requestValidateToken() {
  return {
    type: REQUEST_VALIDATE_TOKEN,
  };
}

function tokenValidated(token) {
  storeToken(token);
  return {
    type: TOKEN_VALIDATED,
    token,
  };
}

function tokenInvalid() {
  clearToken();
  return {
    type: TOKEN_INVALID,
  };
}

export function validateToken() {
  return dispatch => {
    const token = getToken();
    if (token) {
      dispatch(requestValidateToken());

      return fetch(api.VALIDATE_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => response.json())
      .then(response => {
        if (response.result) {
          dispatch(tokenValidated(token));
          return Promise.resolve(1);
        } else {
          console.log('Token validation error:', response.error);
          dispatch(tokenInvalid());
          return Promise.resolve(0);
        }
      });
    } else {
      dispatch(tokenInvalid());
      return Promise.resolve(0);
    }
  };
}

/* Login */

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

function requestLogin() {
  return {
    type: REQUEST_LOGIN,
  };
}

function receiveLogin(token) {
  storeToken(token);
  return {
    type: RECEIVE_LOGIN,
    token,
  };
}

function loginFailed() {
  return {
    type: LOGIN_FAILED,
  };
}

export function login(credentials) {
  return dispatch => {
    dispatch(requestLogin());

    return fetch(api.LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(response => response.json())
    .then(response => {
      if (response.token) {
        dispatch(receiveLogin(response.token));
        return 1;
      } else {
        console.log('Login error:', response.error);
        dispatch(loginFailed());
        return response.error;
      }
    });
  };
}

/* Logout */
export const LOGOUT = 'LOGOUT';

export function logout() {
  clearToken();
  return {
    type: LOGOUT,
  };
}

/* Register */

export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER';
export const REGISTER_FAILED = 'REGISTER_FAILED';

function requestRegister() {
  return {
    type: REQUEST_REGISTER,
  };
}

function receiveRegister(token) {
  storeToken(token);
  return {
      type: RECEIVE_REGISTER,
      token,
  };
}

function registerFailed() {
  return {
    type: REGISTER_FAILED,
  };
}

export function register(credentials) {
  return dispatch => {
    dispatch(requestRegister());

    return fetch(api.REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(response => response.json())
    .then(response => {
      if (response.token) {
        dispatch(receiveRegister(response.token));
        return 1;
      } else {
        console.log('Registration error:', response.error);
        dispatch(registerFailed());
        return response.error;
      }
    });
  };
}