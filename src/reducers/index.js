import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AddReducer from "./AddReducer";
import GetReducer from "./GetReducer";
export default combineReducers({
  auth: AuthReducer,
  add: AddReducer,
  inventorylist: GetReducer
});
