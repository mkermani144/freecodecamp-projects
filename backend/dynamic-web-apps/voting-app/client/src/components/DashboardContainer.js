import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPoll } from '../actions/actionCreators';

import Dashboard from './Dashboard';

const mapStateToProps = state => ({ polls: state.polls });
const mapDispatchToProps = dispatch => bindActionCreators({ addPoll }, dispatch);

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
