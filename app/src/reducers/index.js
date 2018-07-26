import { combineReducers } from "redux";
import SessionReducer from "./SessionReducer.jsx";//userSession is also used to name action creator for login( see actions index)
import { saveUser } from "../actions";
export default combineReducers ({
  userInfo: SessionReducer
});