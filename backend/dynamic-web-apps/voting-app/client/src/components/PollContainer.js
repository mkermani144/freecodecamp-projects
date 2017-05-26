import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { vote, removePoll, addChoice } from '../actions/actionCreators';

import Poll from './Poll';

const mapStateToProps = state => ({ polls: state.polls, user: state.user.user });
const mapDispatchToProps = dispatch => bindActionCreators({ vote, removePoll, addChoice }, dispatch);

const PollContainer = connect(mapStateToProps, mapDispatchToProps)(Poll);

export default PollContainer;
