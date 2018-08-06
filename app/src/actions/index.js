import { LOGIN, LOGOUT, LOAD_USERS } from "./types";
import axios from "axios";
import firebase from "firebase/app";
import { dbConfig } from "../config/firebase";

export const saveUser = (user) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: user
  })
};

export const searchActivities = (input) => dispatch => {
  fetch("/home")
  .then(res => {console.log("mount res: ", res)});
}

export const loadUsersCollection = () => dispatch => {//thyere still not unique
  const usersCollection = firebase.database().ref().child('users')
  usersCollection.once('value').then(function(snapshot) {
    let usersList = []
    for(const user in snapshot.val()) {
      usersList.push(snapshot.val()[user]);
    }
    // console.log(usersList);
        dispatch({
          type: LOAD_USERS,
          payload: usersList
        })
  });
}