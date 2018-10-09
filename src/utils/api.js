const ROOT_URL = 'http://localhost:3000';

export const LOGIN_URL = `${ROOT_URL}/login`;
export const VALIDATE_URL = `${ROOT_URL}/validate`;
export const REGISTER_URL = `${ROOT_URL}/register`;
export const QUIZ_LIST_URL = `${ROOT_URL}/quiz`;
export const QUIZ_URL = ((quizName) => `${ROOT_URL}/quiz/${quizName}`);
export const QUIZ_CREATE_URL = `${ROOT_URL}/quiz/create`;
export const QUIZ_EDIT_URL = ((quizName) => `${ROOT_URL}/quiz/${quizName}/edit`);
export const QUIZ_DELETE_URL = ((quizName) => `${ROOT_URL}/quiz/${quizName}/delete`);