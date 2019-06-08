import { combineReducers } from 'redux';

const INITIAL_STATE = {};

function peoplesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const appReducer = combineReducers({
  peoplesReducer,
});

export default appReducer;
