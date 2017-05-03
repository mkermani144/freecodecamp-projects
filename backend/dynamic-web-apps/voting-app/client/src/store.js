import { createStore } from 'redux';
import rootReducer from './reducers/root';

const defaultState = {
  user: {
    loggedIn: localStorage.get(loggedIn) || false,
  },
  polls: [],
};

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
