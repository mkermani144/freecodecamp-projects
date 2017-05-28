import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logIn, logOut, addPoll } from '../actions/actionCreators';

import Signup from './Signup';

const mapStateToProps = state => state.user;
const mapDispatchToProps = dispatch => bindActionCreators({ logIn, logOut, addPoll }, dispatch);

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;
