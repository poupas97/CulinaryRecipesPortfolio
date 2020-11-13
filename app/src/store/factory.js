const actions = ['RESET', 'LOADING', 'ERROR', 'SAVE', 'LIST', 'ITEM', 'REMOVE'];

const initialState = {
  loading: null,
  error: null,
  saved: null,
  list: null,
  item: null
};

const capitalize = value =>
  String(value).split('_').map(it =>
    it.charAt(0).toUpperCase() + it.slice(1).toLowerCase()).join('');

export const generateActions = prefix =>
  actions.reduce((acc, current) =>
    ({ ...acc, [capitalize(current)]: `${String(prefix).toUpperCase()}_${current}` })
  , {});

export const generateReducer = thisActions => (state = initialState, action) => {
  switch (action.type) {
    default: return state;

    case thisActions.Reset: {
      return initialState;
    }

    case thisActions.Loading: {
      return { ...state, loading: true };
    }

    case thisActions.Error: {
      return { ...state,
        loading: false,
        error: action.payload,
      };
    }

    case thisActions.Save: {
      return { ...state,
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
  }
};
