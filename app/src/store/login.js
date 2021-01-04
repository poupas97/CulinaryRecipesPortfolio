import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { ApiGet } from '../api/Api';
import { removeToken, setToken } from '../tools';
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
    const token = jwtDecode(result.data.accessToken);
    dispatch({ type: ACTIONS.Save, payload: token });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export const resetLoginAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export const logoutAction = async dispatch => {
  try {
    dispatch({ type: ACTIONS.Loading });

    await ApiGet('/logout');

    removeToken();

    dispatch({ type: ACTIONS.Save, payload: null });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    dispatch({ type: ACTIONS.Error, payload: error });
  }
};

export default {};
