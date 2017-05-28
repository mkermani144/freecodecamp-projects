import { combineReducers } from 'redux';
import polls from './polls';
import user from './user';

const appReducer = combineReducers({ polls, user });

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {
      user: {
        loggedIn: localStorage.getItem('loggedIn') || false,
        errorMessage: '',
      },
      polls: [],
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
