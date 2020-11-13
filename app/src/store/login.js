import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { setToken } from '../tools';
import { BASE_URL, HEADERS } from './constants';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('login');

export const REDUCER = generateReducer(ACTIONS);

export const loginAction = async (dispatch, user) => {
  try {
    dispatch({ type: ACTIONS.Loading });

    const result = await axios.post(`${BASE_URL}/login`, user, { headers: HEADERS });

    setToken(result.data);
    const userDecode = jwtDecode(result.data.accessToken);
    dispatch({ type: ACTIONS.Save, payload: userDecode });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: { message: error.message } });
  }
};

export const resetLoginAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export default {};
