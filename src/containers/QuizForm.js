import { connect } from 'react-redux';
import QuizForm from '../components/QuizForm';
import * as auth from '../actions/auth';
import * as quiz from '../actions/quiz';

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.quiz,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(auth.logout()),
  fetchQuiz: (quizName) => dispatch(quiz.fetchQuiz(quizName)),
  createQuiz: (quizData, dummy) => dispatch(quiz.createQuiz(quizData)),
  editQuiz: (quizData, originalQuizName) => dispatch(quiz.editQuiz(quizData, originalQuizName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizForm);
