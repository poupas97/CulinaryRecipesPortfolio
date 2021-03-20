import { generatePowerActions } from './factory';

const TypeNotification = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  list: null,
};

const [ACTIONS_DISPATCH, ACTIONS_NAMES] = generatePowerActions('notifications');

export const notificationsSelectors = (state) => state.NOTIFICATIONS;

export const resetNotificationsAction = async (dispatch) => {
  ACTIONS_DISPATCH.Reset(dispatch);
};

export const createSuccessNotificationAction = async (dispatch, text) => {
  ACTIONS_DISPATCH.Save(dispatch, { text, type: TypeNotification.SUCCESS });
};

export const createErrorNotificationAction = async (dispatch, text) => {
  ACTIONS_DISPATCH.Save(dispatch, { text, type: TypeNotification.ERROR });
};

export const removeNotificationAction = async (dispatch, index = -1) => {
  ACTIONS_DISPATCH.Remove(dispatch, index);
};

export const NOTIFICATIONS = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case ACTIONS_NAMES.Reset: {
      return initialState;
    }

    case ACTIONS_NAMES.Save: {
      const currentList = state.list || [];
      return {
        ...state,
        list: [
          ...currentList,
          {
            notification: action.payload.text,
            type: action.payload.type,
          },
        ],
      };
    }

    case ACTIONS_NAMES.Remove: {
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
