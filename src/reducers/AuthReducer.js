import { EMAIL, PASSWORD, ERROR, JWT } from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: "",
  jwt: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL:
      return { ...state, email: action.payload };
    case PASSWORD:
      return { ...state, password: action.payload };
    case ERROR:
      return { ...state, error: action.payload };
    case JWT:
      return { ...state, jwt: action.payload };
    default:
      return state;
  }
};
