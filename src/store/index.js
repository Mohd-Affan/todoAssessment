import {createStore, applyMiddleware} from 'redux';
import apiReducer from '../modules/main/reducer';
import thunk from 'redux-thunk';
const store = createStore(apiReducer, applyMiddleware(thunk));
export default store;
