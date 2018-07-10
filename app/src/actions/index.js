import { LOGIN, LOGOUT } from "./types";
import axios from "axios";

export const userSession = (user) => dispatch => {
  console.log("starting userSession for ", user);
  dispatch({
    type: LOGIN,
    payload: user
  })
};

