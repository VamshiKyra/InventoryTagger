import { LIST } from "../actions/types";

const INITIAL_STATE = {
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
