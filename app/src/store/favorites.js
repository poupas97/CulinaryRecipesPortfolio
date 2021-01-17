import Api from '../api/Api';
import { generatePowerActions, generateReducer } from './factory';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('favorites');

export const FAVORITES = generateReducer(ACTIONS_NAMES);

export const favoritesSelectors = state => state.FAVORITES;

export const resetFavoritesAction = async dispatch => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const listFavoritesAction = async dispatch => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get('/favorites');

    ACTIONS_DISPATCH.List(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const addFavoriteAction = async (dispatch, recipeId) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const { id } = await Api.Post('/favorites/', recipeId);

    ACTIONS_DISPATCH.Save(dispatch, id);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const removeFavoriteAction = async (dispatch, id) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const { deleted } = await Api.Delete(`/favorites/${id}/`);

    ACTIONS_DISPATCH.Delete(dispatch, deleted);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};