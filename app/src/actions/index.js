import { LOGIN, LOGOUT } from "./types";
import axios from "axios";

export const userSession = () => dispatch => {
  axios
  .get("http://google.com")
  .then(res => {
    console.log("response: ", res);

  })
  .catch(err => {
    console.log("LOGIN action error: ", err)
  });
};