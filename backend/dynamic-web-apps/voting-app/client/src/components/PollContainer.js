import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { vote, removePoll } from '../actions/actionCreators';

import Poll from './Poll';

const mapStateToProps = state => ({ polls: state.polls, user: state.user.user });
const mapDispatchToProps = dispatch => bindActionCreators({ vote, removePoll }, dispatch);

const PollContainer = connect(mapStateToProps, mapDispatchToProps)(Poll);

export default PollContainer;
