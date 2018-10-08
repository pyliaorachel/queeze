import { connect } from 'react-redux';
import App from '../components/App';
import * as auth from '../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  validateToken: () => dispatch(auth.validateToken()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
