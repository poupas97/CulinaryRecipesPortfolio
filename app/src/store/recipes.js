import { ApiGet } from '../api/Api';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('recipes');

export const REDUCER = generateReducer(ACTIONS);

export const getRecipesAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });

    const data = await ApiGet('/recipes');

    dispatch({ type: ACTIONS.List, payload: data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const resetRecipesAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export default {};
