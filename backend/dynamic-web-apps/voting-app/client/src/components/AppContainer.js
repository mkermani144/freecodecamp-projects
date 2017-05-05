import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = state => ({ loggedIn: state.user.loggedIn });

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
