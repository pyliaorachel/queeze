import * as api from '../utils/api';

export const QUIZ_ERROR = 'QUIZ_ERROR';

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
        dispatch({ type: QUIZ_ERROR });
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

    return fetch(`${api.QUIZ_URL(quizName)}`, {
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
        return Promise.resolve(quiz);
      }).catch(err => {
        console.log('Fetch error:', err);
        dispatch({ type: QUIZ_ERROR });
        return Promise.resolve(0);
      });
  };
}

export const QUIZ_CREATED = 'QUIZ_CREATED';
export const QUIZ_EDITTED = 'QUIZ_EDITTED';
export const QUIZ_DELETED = 'QUIZ_DELETED';

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
          dispatch({ type: QUIZ_ERROR });
          return Promise.resolve(result.error);
        } else {
          quizId = result.id;
          dispatch({ type: QUIZ_CREATED, quizName: quizData.name, quiz: quizData.questions });
          return Promise.resolve(1);
        }
      }).catch(err => {
        console.log('Fetch error:', err);
        dispatch({ type: QUIZ_ERROR });
        return Promise.resolve(err);
      });
  };
}

export function editQuiz(quizData, originalQuizName) {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token === '') return;

    return fetch(`${api.QUIZ_EDIT_URL(originalQuizName)}`, {
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
          dispatch({ type: QUIZ_ERROR });
          return Promise.resolve(result.error);
        } else {
          quizId = result.id;
          dispatch({ type: QUIZ_EDITTED, originalQuizName, newQuizName: quizData.name, quiz: quizData.questions });
          return Promise.resolve(1);
        }
      }).catch(err => {
        console.log('Fetch error:', err);
        dispatch({ type: QUIZ_ERROR });
        return Promise.resolve(err);
      });
  };
}

export function deleteQuiz(quizName) {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token === '') return;

    return fetch(`${api.QUIZ_DELETE_URL(quizName)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(result => result.json())
      .then(result => {
        let quizName;
        if (result.error) {
          console.log('Fetch quiz error:', result.error);
          quizName = null;
          dispatch({ type: QUIZ_ERROR });
          return Promise.resolve(result.error);
        } else {
          quizName = result.quizName;
          dispatch({ type: QUIZ_DELETED, quizName });
          return Promise.resolve(1);
        }
      }).catch(err => {
        console.log('Fetch error:', err);
        dispatch({ type: QUIZ_ERROR });
        return Promise.resolve(err);
      });
  };
}