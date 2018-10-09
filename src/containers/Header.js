import { connect } from 'react-redux';
import Header from '../components/Header';
import * as auth from '../actions/auth';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
