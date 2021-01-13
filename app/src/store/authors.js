import get from 'lodash/get';
import has from 'lodash/has';

import Api from '../api/Api';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('authors');

export const REDUCER = generateReducer(ACTIONS);

export const resetAuthorsAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export const listAuthorsAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });

    const data = await Api.Get('/authors');

    dispatch({ type: ACTIONS.List, payload: data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const getAuthorAction = async (dispatch, id) => {
  dispatch({ type: ACTIONS.Loading });
  const data = await Api.Get(`/authors/${id}`);
  dispatch({ type: ACTIONS.Item, payload: data });
};

export const saveAuthorAction = async (dispatch, author) => {
  try {
    dispatch({ type: ACTIONS.Loading });

    let saved;
    if (has(author, 'id')) {
      const { updated } = await Api.Put(`/authors/${get(author, 'id')}/`, author);
      saved = updated;
    } else {
      const { id } = await Api.Post('/authors/', author);
      saved = !!id;
    }

    dispatch({ type: ACTIONS.Save, payload: saved });
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export default {};
