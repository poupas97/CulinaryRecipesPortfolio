import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generatePowerActions, generateReducer } from './factory';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('recipes');

export const RECIPES = generateReducer(ACTIONS_NAMES);

export const recipesSelectors = state => state.RECIPES;

export const resetRecipesAction = async dispatch => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const listRecipesAction = async dispatch => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get('/recipes');

    ACTIONS_DISPATCH.List(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const getRecipeAction = async (dispatch, id) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get(`/recipes/${id}`);

    ACTIONS_DISPATCH.Item(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const saveRecipeAction = async (dispatch, recipe) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    let saved;
    if (has(recipe, 'id')) {
      const { updated } = await Api.Put(`/recipes/${get(recipe, 'id')}/`, recipe);
      saved = updated;
    } else {
      const { id } = await Api.Post('/recipes/', recipe);
      saved = !!id;
    }

    ACTIONS_DISPATCH.Save(dispatch, saved);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};
