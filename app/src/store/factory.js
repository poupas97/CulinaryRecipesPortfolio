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
        error: action.payload,
        loading: false
      };
    }

    case thisActions.Save: {
      return { ...state,
        list: null,
        saved: action.payload,
        loading: false
      };
    }

    case thisActions.List: {
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    }

    case thisActions.Item: {
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    }
  }
};
