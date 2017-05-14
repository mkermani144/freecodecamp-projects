import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn, logOut, addPoll } from '../actions/actionCreators';

import App from './App';

const mapStateToProps = state => ({ loggedIn: state.user.loggedIn });
const mapDispatchToProps = dispatch => bindActionCreators({ logIn, logOut, addPoll }, dispatch);

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
