import { LOGIN, LOGOUT } from "./types";
import axios from "axios";
import firebase from "firebase/app";
import { dbConfig } from "../config/firebase";

export const saveUser = (user) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: user
  })
};

// export const displayUser = (value) in nav componenet


