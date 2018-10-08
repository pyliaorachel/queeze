import { connect } from 'react-redux';
import Register from '../components/Register';
import * as auth from '../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  register: credentials => dispatch(auth.register(credentials)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
