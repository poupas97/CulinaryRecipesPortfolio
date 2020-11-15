import { ApiGet } from '../api/Api';
import { getDecodedToken } from '../tools';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('user');

export const REDUCER = generateReducer(ACTIONS);

export const getUserAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });
    const token = getDecodedToken();

    const data = await ApiGet(`/users/${token.id}`);

    dispatch({ type: ACTIONS.Item, payload: data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const resetUserAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export default {};
