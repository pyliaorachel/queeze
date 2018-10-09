import { connect } from 'react-redux';
import QuizPlay from '../components/QuizPlay';
import * as auth from '../actions/auth';
import * as quiz from '../actions/quiz';

const mapStateToProps = state => ({
  auth: state.auth,
  quiz: state.quiz,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(auth.logout()),
  fetchQuiz: (quizName) => dispatch(quiz.fetchQuiz(quizName)),
  deleteQuiz: (quizName) => dispatch(quiz.deleteQuiz(quizName)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPlay);
