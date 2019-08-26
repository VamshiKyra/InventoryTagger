import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AddReducer from "./AddReducer";
import GetReducer from "./GetReducer";
import SearchReducer from "./SearchReducer";
export default combineReducers({
  auth: AuthReducer,
  add: AddReducer,
  inventorylist: GetReducer,
  search: SearchReducer
});
