import * as api from '../utils/api';

export const REQUEST_QUIZ_LIST = 'REQUEST_QUIZ_LIST';
export const RECEIVE_QUIZ_LIST = 'RECEIVE_QUIZ_LIST';

function requestQuizList() {
  return {
    type: REQUEST_QUIZ_LIST,
  };
}

function receiveQuizList(quizList) {
  return {
    type: RECEIVE_QUIZ_LIST,
    quizList,
  };
}

export function fetchQuizList() {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token === '') return;

    dispatch(requestQuizList());

    return fetch(api.QUIZ_LIST_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(result => result.json())
      .then(result => {
        let quizList;
        if (result.error) {
          console.log('Fetch quiz list error:', result.error);
          quizList = [];
        } else
          quizList = result.data;
        dispatch(receiveQuizList(quizList));
      }).catch(err => {
        console.log('Fetch error:', err);
      });
  };
}

export const REQUEST_QUIZ = 'REQUEST_QUIZ';
export const RECEIVE_QUIZ = 'RECEIVE_QUIZ';

function requestQuiz(quizName) {
  return {
    type: REQUEST_QUIZ,
    quizName,
  };
}

function receiveQuiz(quizName, quiz) {
  return {
    type: RECEIVE_QUIZ,
    quiz,
    quizName,
  };
}

export function fetchQuiz(quizName) {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token === '') return;

    dispatch(requestQuiz(quizName));

    return fetch(`${api.QUIZ_URL}/${quizName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(result => result.json())
      .then(result => {
        let quiz;
        if (result.error) {
          console.log('Fetch quiz error:', result.error);
          quiz = null;
        } else
          quiz = result.data;
        dispatch(receiveQuiz(quizName, quiz));
      }).catch(err => {
        console.log('Fetch error:', err);
      });
  };
}

export const CREATE_QUIZ = 'CREATE_QUIZ';

export function createQuiz(quizData) {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token === '') return;

    return fetch(`${api.QUIZ_CREATE_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    }).then(result => result.json())
      .then(result => {
        let quizId;
        if (result.error) {
          console.log('Fetch quiz error:', result.error);
          quizId = null;
          return Promise.resolve(result.error);
        } else {
          quizId = result.id;
          return Promise.resolve(1);
        }
      }).catch(err => {
        console.log('Fetch error:', err);
        return Promise.resolve(err);
      });
  };
}