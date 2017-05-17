import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { vote } from '../actions/actionCreators';

import Poll from './Poll';

const mapStateToProps = state => ({ polls: state.polls });
const mapDispatchToProps = dispatch => bindActionCreators({ vote }, dispatch);

const PollContainer = connect(mapStateToProps, mapDispatchToProps)(Poll);

export default PollContainer;
