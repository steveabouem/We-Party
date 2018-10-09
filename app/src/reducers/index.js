import { combineReducers } from "redux";
import SessionReducer from "./SessionReducer.jsx";
export default combineReducers ({
  userInfo: SessionReducer
});