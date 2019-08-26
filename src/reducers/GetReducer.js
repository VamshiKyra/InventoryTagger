import { LIST, USER, ADMIN_LIST, ADMIN, LIST_COUNT, ADMIN_LIST_COUNT, TOTAL_COUNT } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  users: [],
  admin_list: [],
  admin: false,
  list_count: "0",
  admin_list_count: "0",
  total_count: "0"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIST:
      return { ...state, list: action.payload };
    case USER:
      return { ...state, users: action.payload };
    case ADMIN_LIST:
      return { ...state, admin_list: action.payload };
    case ADMIN:
      return { ...state, admin: action.payload };
    case LIST_COUNT:
      return { ...state, list_count: action.payload };
    case ADMIN_LIST_COUNT:
      return { ...state, admin_list_count: action.payload };
    case TOTAL_COUNT:
      return { ...state, total_count: action.payload };
    default:
      return state;
  }
};
