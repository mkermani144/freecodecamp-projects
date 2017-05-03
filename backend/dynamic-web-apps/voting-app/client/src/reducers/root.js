import { combineReducers } from 'redux';
import polls from './polls';
import user from './user';

const rootReducer = combineReducers({ polls, user });

export default rootReducer;
