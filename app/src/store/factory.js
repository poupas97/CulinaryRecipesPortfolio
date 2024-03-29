import get from 'lodash/get';

const actions = ['RESET', 'LOADING', 'ERROR', 'SAVE', 'LIST', 'ITEM', 'REMOVE'];

const defaultState = {
  loading: null,
  error: null,
  saved: null,
  deleted: null,
  list: null,
  item: null,
};

const capitalize = (value) =>
  String(value)
    .split('_')
    .map((it) => it.charAt(0).toUpperCase() + it.slice(1).toLowerCase())
    .join('');

export const generateActions = (prefix) =>
  actions.reduce(
    (acc, current) => ({
      ...acc,
      [capitalize(current)]: `${String(prefix)
        .replace('-', '_')
        .toUpperCase()}__${current}`,
    }),
    {}
  );

const generateActionsName = (prefix) =>
  actions.reduce(
    (acc, current) => ({
      ...acc,
      [capitalize(current)]: `${String(prefix)
        .replace('-', '_')
        .toUpperCase()}__${current}`,
    }),
    {}
  );

const generateActionsDispatch = (prefix) =>
  actions.reduce(
    (acc, current) => ({
      ...acc,
      [capitalize(current)]: (dispatch, payload, error, meta) =>
        dispatch({
          type: `${String(prefix).replace('-', '_').toUpperCase()}__${current}`,
          payload,
          error,
          meta,
        }),
    }),
    {}
  );

export const generatePowerActions = (prefix) => [
  generateActionsDispatch(prefix),
  generateActionsName(prefix),
];

export const generateReducer = (thisActions, initialState = defaultState) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    default:
      return state;

    case thisActions.Reset: {
      return initialState;
    }

    case thisActions.Loading: {
      return { ...state, loading: true };
    }

    case thisActions.Error: {
      return {
        ...state,
        loading: false,
        error:
          get(action.payload, 'response.data.error') ||
          get(action.payload, 'message'),
      };
    }

    case thisActions.Save: {
      return {
        ...state,
        loading: false,
        error: null,
        list: null,
        saved: action.payload,
      };
    }

    case thisActions.List: {
      return {
        ...state,
        loading: false,
        error: null,
        list: action.payload,
      };
    }

    case thisActions.Item: {
      return {
        ...state,
        loading: false,
        error: null,
        item: action.payload,
      };
    }

    case thisActions.Remove: {
      return {
        ...state,
        loading: false,
        error: null,
        list: null,
        deleted: action.payload,
      };
    }
  }
};
