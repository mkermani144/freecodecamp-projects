import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import App from './App';

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
