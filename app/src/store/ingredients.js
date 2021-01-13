import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generatePowerActions, generateReducer } from './factory';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('ingredients');

export const INGREDIENTS = generateReducer(ACTIONS_NAMES);

export const ingredientsSelectors = state => state.INGREDIENTS;

export const resetIngredientsAction = async dispatch => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const listIngredientsAction = async dispatch => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get('/ingredients');

    ACTIONS_DISPATCH.List(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const getIngredientAction = async (dispatch, id) => {
  try {ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get(`/ingredients/${id}`);

    ACTIONS_DISPATCH.Item(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const saveIngredientAction = async (dispatch, ingredient) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    let saved;
    if (has(ingredient, 'id')) {
      const { updated } = await Api.Put(`/ingredients/${get(ingredient, 'id')}/`, ingredient);
      saved = updated;
    } else {
      const { id } = await Api.Post('/ingredients/', ingredient);
      saved = !!id;
    }

    ACTIONS_DISPATCH.Save(dispatch, saved);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};
