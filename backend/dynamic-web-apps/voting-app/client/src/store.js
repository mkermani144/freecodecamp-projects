import { createStore } from 'redux';
import rootReducer from './reducers/root';

const defaultState = {

};
const store = createStore(rootReducer, defaultState);

export default store;
