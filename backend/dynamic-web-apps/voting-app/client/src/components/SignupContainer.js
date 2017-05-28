import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logIn, addPoll } from '../actions/actionCreators';

import Signup from './Signup';

const mapStateToProps = state => state.user;
const mapDispatchToProps = dispatch => bindActionCreators({ logIn, addPoll }, dispatch);

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;
