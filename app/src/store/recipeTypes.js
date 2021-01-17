import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generatePowerActions, generateReducer } from './factory';
import { createSuccessNotificationAction } from './notifications';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('recipe-types');

export const RECIPE_TYPES = generateReducer(ACTIONS_NAMES);

export const recipeTypesSelectors = state => state.RECIPE_TYPES;

export const resetRecipeTypesAction = async dispatch => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const listRecipeTypesAction = async dispatch => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get('/recipeTypes');

    ACTIONS_DISPATCH.List(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const getRecipeTypesAction = async (dispatch, id) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get(`/recipeTypes/${id}`);

    ACTIONS_DISPATCH.Item(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const saveRecipeTypeAction = async (dispatch, recipeType) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    let saved;
    if (has(recipeType, 'id')) {
      const { updated } = await Api.Put(`/recipeTypes/${get(recipeType, 'id')}/`, recipeType);
      saved = updated;
      createSuccessNotificationAction(dispatch, 'Recipe Type was updated.');
    } else {
      const { id } = await Api.Post('/recipeTypes/', recipeType);
      saved = !!id;
      createSuccessNotificationAction(dispatch, 'Recipe Type was created.');
    }

    ACTIONS_DISPATCH.Save(dispatch, saved);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const removeRecipeTypeAction = async (dispatch, id) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const { deleted } = await Api.Delete(`/recipeTypes/${id}/`);
    createSuccessNotificationAction(dispatch, 'Recipe Type was removed.');

    ACTIONS_DISPATCH.Remove(dispatch, deleted);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};
