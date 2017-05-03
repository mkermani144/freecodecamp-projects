import { createStore } from 'redux';
import rootReducer from './reducers/root';

const defaultState = {
  user: {
    loggedIn: localStorage.getItem('loggedIn') || false,
  },
  polls: [],
};

const store = createStore(
  rootReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
