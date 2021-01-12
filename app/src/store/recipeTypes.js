import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('recipe-types');

export const REDUCER = generateReducer(ACTIONS);

export const resetRecipeTypesAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export const listRecipeTypesAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });

    const data = await Api.Get('/recipeTypes');

    dispatch({ type: ACTIONS.List, payload: data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const getRecipeTypesAction = async (dispatch, id) => {
  dispatch({ type: ACTIONS.Loading });
  const data = await Api.Get(`/recipeTypes/${id}`);
  dispatch({ type: ACTIONS.Item, payload: data });
};

export const saveRecipeTypesAction = async (dispatch, recipeType) => {
  try {
    dispatch({ type: ACTIONS.Loading });

    let saved;
    if (has(recipeType, 'id')) {
      const { updated } = await Api.Put(`/recipeTypes/${get(recipeType, 'id')}/`, recipeType);
      saved = updated;
    } else {
      const { id } = await Api.Post('/recipeTypes/', recipeType);
      saved = !!id;
    }

    dispatch({ type: ACTIONS.Save, payload: saved });
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export default {};
