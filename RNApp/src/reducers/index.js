import { combineReducers } from 'redux';

const INITIAL_PEOPLES_STATE = {
  peoples: [],
  page: 1,
  count: null,
  loading: false,
  done: false,
};

function peoplesReducer(state = INITIAL_PEOPLES_STATE, action) {
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

const INITIAL_PEOPLE_STATE = {
  people: {},
  loading: false,
  error: false,
  errorMessage: '',
};

function peopleReducer(state = INITIAL_PEOPLE_STATE, action) {
  switch (action.type) {
    case 'GET_PEOPLE':
      return { ...state, loading: true };

    case 'PEOPLE_RECEIVED':
      return {
        ...state,
        people: action.people,
        loading: false,
        error: false,
      };

    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
}

const appReducer = combineReducers({
  peoplesReducer,
  peopleReducer,
});

export default appReducer;
