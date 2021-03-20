import Api from '../api/Api';
import { generatePowerActions, generateReducer } from './factory';
import { createSuccessNotificationAction } from './notifications';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('favorites');

export const FAVORITES = generateReducer(ACTIONS_NAMES);

export const favoritesSelectors = (state) => state.FAVORITES;

export const resetFavoritesAction = async (dispatch) => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const listFavoritesAction = async (dispatch) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get('/favorites');

    ACTIONS_DISPATCH.List(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const addFavoriteAction = async (dispatch, idRecipe) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const { id } = await Api.Post('/favorites/', { idRecipe });
    createSuccessNotificationAction(dispatch, 'Favorite added.');

    ACTIONS_DISPATCH.Save(dispatch, id);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const removeFavoriteAction = async (dispatch, id) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const { deleted } = await Api.Delete(`/favorites/${id}/`);
    createSuccessNotificationAction(dispatch, 'Favorite removed.');

    ACTIONS_DISPATCH.Remove(dispatch, deleted);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};
