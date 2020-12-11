// store creation
import {compose, createStore} from 'redux';
import allReducers from './reducers';
// import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    allReducers, composeEnhancer()
);

export default store;