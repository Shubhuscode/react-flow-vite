// src/redux/store.js
import { createStore } from 'redux';
import flowReducer from './reducers'; // Import the flowReducer

const store = createStore(flowReducer);

export default store;
