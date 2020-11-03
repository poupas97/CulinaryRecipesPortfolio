import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

// import { REDUCER as ADOPTIONS } from './adoption';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ /*ANIMALS*/ });
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

export default store;
