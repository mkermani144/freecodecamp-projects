import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logIn } from '../actions/actionCreators';

import Login from './Login';

const mapStateToProps = state => state.user;
const mapDispatchToProps = dispatch => bindActionCreators({ logIn }, dispatch);

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
