import axios from 'axios';

import { BASE_URL } from './constants';
import { generateActions, generateReducer } from './factory';
// import { createNotificationAction, TypeNotification } from './notifications';

const ACTIONS = generateActions('login');

export const REDUCER = generateReducer(ACTIONS);

export const loginAction = async (dispatch, people) => {
  try {
    dispatch({ type: ACTIONS.Loading });
    console.log(1111, people);
    const result = await axios.post(`${BASE_URL}login`, people);
    console.log(result);
    // dispatch({ type: ACTIONS.Save, payload: result.data });
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    console.log(error);
    // dispatch({ type: ACTIONS.Error, payload: { message: 'error', errors: error.response.data } });
  }
};

export default {};
