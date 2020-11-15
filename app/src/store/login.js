import axios from 'axios';
import jwtDecode from 'jwt-decode';
import get from 'lodash/get';

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
    const token = jwtDecode(result.data.accessToken);
    dispatch({ type: ACTIONS.Save, payload: token });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch ({ response }) {
    dispatch({ type: ACTIONS.Error, payload: get(response, 'data.error') });
  }
};

export const resetLoginAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export default {};
