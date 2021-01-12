import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { REDUCER as LOGIN } from './login';
import { REDUCER as NOTIFICATIONS } from './notifications';
import { REDUCER as RECIPES } from './recipes';
import { REDUCER as RECIPE_TYPES } from './recipeTypes';
import { REDUCER as USER } from './user';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({ LOGIN, NOTIFICATIONS, USER, RECIPES, RECIPE_TYPES });
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

export default store;
