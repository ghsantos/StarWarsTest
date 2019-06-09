import { combineReducers } from 'redux';

const INITIAL_STATE = {
  peoples: [],
  page: 1,
  count: null,
  loading: false,
  done: false,
};

function peoplesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_PEOPLES':
      return { ...state, loading: true };

    case 'PEOPLES_RECEIVED':
      return {
        ...state,
        page: state.page + 1,
        peoples: [...state.peoples, ...action.peoples],
        loading: false,
        count: action.count,
      };

    case 'PEOPLES_DONE':
      return {
        ...state,
        loading: false,
        done: true,
      };

    default:
      return state;
  }
}

const appReducer = combineReducers({
  peoplesReducer,
});

export default appReducer;
