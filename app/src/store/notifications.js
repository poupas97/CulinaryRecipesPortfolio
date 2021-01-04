import { generateActions } from './factory';

export const TypeNotification = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const ACTIONS = generateActions('notifications');

const initialState = {
  list: null,
};

export const createNotificationAction = async (dispatch, text, type) => {
  dispatch({ type: ACTIONS.Save, payload: { text, type } });
};

export const removeNotificationAction = async (dispatch, index = -1) => {
  dispatch({ type: ACTIONS.Remove, payload: index });
};

export const resetNotificationsAction = async dispatch => {
  dispatch({ type: ACTIONS.Reset });
};

export const REDUCER = (state = initialState, action) => {
  switch (action.type) {
    default: return state;

    case ACTIONS.Reset: {
      return initialState;
    }

    case ACTIONS.Save: {
      const currentList = state.list || [];
      return {
        ...state,
        list: [...currentList, {
          id: currentList.length++,
          notification: action.payload.text,
          type: action.payload.type,
        }],
      };
    }

    case ACTIONS.Remove: {
      if (action.payload.index === -1) return state;
      const nextList = [...(state.list || [])];
      nextList.splice(action.payload.index, 1);
      return {
        ...state,
        list: nextList,
      };
    }
  }
};

export default {};
