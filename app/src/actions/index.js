import { dbConfig } from "../config/firebase";
import { LOGIN, LOGOUT, LOAD_USERS, SEARCH_CLUBS, SAVE_VENUE } from "./types";
import axios from "axios";
const firebase = require("firebase");
require("firebase/functions");
firebase.initializeApp(dbConfig);

export const saveUser = (user) => dispatch => {
  dispatch({
    type: LOGIN,
    payload: user
  })
};

export const searchActivities = (search) => async(dispatch) => {
  axios.get(`/home:${search}`)
  .then(res => {
    // console.log(" res: ", res.data);
    dispatch({
      type: SEARCH_CLUBS,
      payload: res.data
    })
  })
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

export const saveActivity = (activity) => dispatch => { //no need to dispatch, call db if needed
  const activitiesCollection = firebase.database().ref().child('activities')
  activitiesCollection.push().set({ venue: activity.venue, location:activity.location, budget: activity.budget, group: activity.group });

  dispatch({
    type: SAVE_VENUE,
    payload: activity
  })
}