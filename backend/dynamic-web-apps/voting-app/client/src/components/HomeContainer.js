import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPoll } from '../actions/actionCreators';

import Home from './Home';

const mapDispatchToProps = dispatch => bindActionCreators({ addPoll }, dispatch);

const HomeContainer = connect(null, mapDispatchToProps)(Home);

export default HomeContainer;
