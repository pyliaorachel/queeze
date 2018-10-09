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
  createQuiz: (quizData) => dispatch(quiz.createQuiz(quizData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizForm);
