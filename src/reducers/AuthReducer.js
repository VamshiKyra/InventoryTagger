import {
    EMAIL
  } from "../actions/types";
  
  const INITIAL_STATE = {
    email: "",
    password: "",
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EMAIL:
        return { ...state, email: action.payload };
      default:
        return state;
    }
  };
  