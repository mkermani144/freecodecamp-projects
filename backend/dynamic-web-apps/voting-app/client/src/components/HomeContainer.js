import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPoll, logOut } from '../actions/actionCreators';

import Home from './Home';

const mapStateToProps = state => ({ polls: state.polls });
const mapDispatchToProps = dispatch => bindActionCreators({ addPoll, logOut }, dispatch);

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
