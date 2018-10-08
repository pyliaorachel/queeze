import { connect } from 'react-redux';
import Login from '../components/Login';
import * as auth from '../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(auth.login(credentials)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
