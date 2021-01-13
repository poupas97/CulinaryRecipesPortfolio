import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generatePowerActions, generateReducer } from './factory';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('authors');

export const AUTHORS = generateReducer(ACTIONS_NAMES);

export const authorsSelectors = state => state.AUTHORS;

export const resetAuthorsAction = async dispatch => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const listAuthorsAction = async dispatch => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get('/authors');

    ACTIONS_DISPATCH.List(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const getAuthorAction = async (dispatch, id) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const payload = await Api.Get(`/authors/${id}`);

    ACTIONS_DISPATCH.Item(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const saveAuthorAction = async (dispatch, author) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    let saved;
    if (has(author, 'id')) {
      const { updated } = await Api.Put(`/authors/${get(author, 'id')}/`, author);
      saved = updated;
    } else {
      const { id } = await Api.Post('/authors/', author);
      saved = !!id;
    }

    ACTIONS_DISPATCH.Save(dispatch, saved);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};
