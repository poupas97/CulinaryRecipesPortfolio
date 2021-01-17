import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { AUTHORS } from './authors';
import { FAVORITES } from './favorites';
import { INGREDIENTS } from './ingredients';
import { LOGIN } from './login';
import { NOTIFICATIONS } from './notifications';
import { RECIPES } from './recipes';
import { RECIPE_TYPES } from './recipeTypes';
import { USERS } from './user';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  LOGIN,
  NOTIFICATIONS,
  USERS,
  RECIPES,
  RECIPE_TYPES,
  INGREDIENTS,
  AUTHORS,
  FAVORITES,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

export default store;
