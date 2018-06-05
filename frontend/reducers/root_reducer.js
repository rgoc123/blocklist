import { combineReducers } from 'redux';



const rootReducer = (state = [], action) => {
  Object.freeze(state);
  return state;
};

export default rootReducer;
