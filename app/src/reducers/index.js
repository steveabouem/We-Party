import { combineReducers } from "redux";
import userSession from "./SessionReducer.jsx";//userSession is also used to name action creator for login( see actions index)
export default combineReducers ({
  userId: userSession
});