import { connect } from 'react-redux';
import Logout from '../components/Logout';
import * as auth from '../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(auth.logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
