import get from 'lodash/get';
import has from 'lodash/has';

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

export const saveRecipeAction = async (dispatch, sensor) => {
  try {
    dispatch({ type: ACTIONS.Loading });

    let saved;
    if (has(sensor, 'id')) {
      const { updated } = await Api.Put(`/recipes/${get(sensor, 'id')}/`, sensor);
      saved = updated;
    } else {
      const { id } = await Api.Post('/recipes/', sensor);
      saved = !!id;
    }

    dispatch({ type: ACTIONS.Save, payload: saved });
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export default {};
