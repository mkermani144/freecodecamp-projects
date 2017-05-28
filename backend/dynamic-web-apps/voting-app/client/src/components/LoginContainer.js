import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logIn, logOut, addPoll } from '../actions/actionCreators';

import Login from './Login';

const mapStateToProps = state => state.user;
const mapDispatchToProps = dispatch => bindActionCreators({ logIn, logOut, addPoll }, dispatch);

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
