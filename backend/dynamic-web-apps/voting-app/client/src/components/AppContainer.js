import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../actions/actionCreators';

import App from './App';

const mapStateToProps = state => ({ loggedIn: state.user.loggedIn });
const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
