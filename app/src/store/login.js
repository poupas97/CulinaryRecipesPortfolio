import jwtDecode from 'jwt-decode';
import Api from '../api/Api';
import { removeToken, setToken } from '../tools';
import { generatePowerActions, generateReducer } from './factory';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('login');

export const LOGIN = generateReducer(ACTIONS_NAMES);

export const loginSelectors = (state) => state.LOGIN;

export const resetLoginAction = async (dispatch) => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const loginAction = async (dispatch, user) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    const result = await Api.PostNoAuth('/login', user);

    setToken(result);
    const token = jwtDecode(result.accessToken);

    ACTIONS_DISPATCH.Save(dispatch, token);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export const logoutAction = async (dispatch) => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);

    await Api.Get('/logout');

    removeToken();

    ACTIONS_DISPATCH.Save(dispatch, null);
    // createNotificationAction(dispatch, 'Login', TypeNotification.SUCCESS);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};
