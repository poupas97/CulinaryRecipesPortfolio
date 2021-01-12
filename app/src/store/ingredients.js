import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('ingredients');

export const REDUCER = generateReducer(ACTIONS);

export const resetIngredientsAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export const listIngredientsAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });

    const data = await Api.Get('/ingredients');

    dispatch({ type: ACTIONS.List, payload: data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const getIngredientAction = async (dispatch, id) => {
  dispatch({ type: ACTIONS.Loading });
  const data = await Api.Get(`/ingredients/${id}`);
  dispatch({ type: ACTIONS.Item, payload: data });
};

export const saveIngredientAction = async (dispatch, ingredient) => {
  try {
    dispatch({ type: ACTIONS.Loading });

    let saved;
    if (has(ingredient, 'id')) {
      const { updated } = await Api.Put(`/ingredients/${get(ingredient, 'id')}/`, ingredient);
      saved = updated;
    } else {
      const { id } = await Api.Post('/ingredients/', ingredient);
      saved = !!id;
    }

    dispatch({ type: ACTIONS.Save, payload: saved });
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export default {};
