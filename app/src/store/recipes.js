import Api from '../api/Api';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('recipes');

export const REDUCER = generateReducer(ACTIONS);

export const resetRecipesAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export const getRecipesAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });

    const data = await Api.Get('/recipes');

    dispatch({ type: ACTIONS.List, payload: data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const getRecipeAction = async (dispatch, id) => {
  dispatch({ type: ACTIONS.Loading });
  const data = await Api.Get(`/recipes/${id}`);
  dispatch({ type: ACTIONS.Item, payload: data });
};

export default {};
