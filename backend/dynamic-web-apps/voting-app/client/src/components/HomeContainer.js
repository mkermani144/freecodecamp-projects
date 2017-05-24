import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPoll } from '../actions/actionCreators';

import Home from './Home';

const mapStateToProps = state => ({ polls: state.polls });
const mapDispatchToProps = dispatch => bindActionCreators({ addPoll }, dispatch);

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
