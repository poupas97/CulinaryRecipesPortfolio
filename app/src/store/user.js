import Api from '../api/Api';
import { getDecodedToken } from '../tools';
import { generatePowerActions, generateReducer } from './factory';

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('users');

export const USERS = generateReducer(ACTIONS_NAMES);

export const usersSelectors = state => state.USERS;

export const resetUserAction = async dispatch => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const getUserAction = async dispatch => {
  try {
    ACTIONS_DISPATCH.Loading(dispatch);
    const token = getDecodedToken();

    const payload = await Api.Get(`/users/${token.id}`);

    ACTIONS_DISPATCH.Item(dispatch, payload);
  } catch (error) {
    ACTIONS_DISPATCH.Error(dispatch, error);
  }
};

export default {};
