import { combineReducers } from "redux";
import SessionReducer from "./SessionReducer.jsx";
import { saveUser } from "../actions";
export default combineReducers ({
  userInfo: SessionReducer
});