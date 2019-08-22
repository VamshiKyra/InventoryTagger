import {
  EMAIL,
  PASSWORD,
  ERROR,
  JWT,
  LOADING,
  OFFLINE_MODE
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: "",
  jwt: "",
  loading: false,
  offline: false
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
    case OFFLINE_MODE:
      return { ...state, offline: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
