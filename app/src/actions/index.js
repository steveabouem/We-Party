import { LOGIN, LOGOUT } from "./types";
import axios from "axios";

export const userSession = (user) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: user
  })
};

