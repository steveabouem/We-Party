import { dbConfig } from "../config/firebase";
import { LOGIN, LOAD_USERS, SEARCH_CLUBS, SAVE_VENUE } from "./types";
import axios from "axios";

const firebase = require("firebase");

firebase.initializeApp(dbConfig);

export const googleLogin = () => dispatch => {
  //refactor google signin and userinfo() here
}

export const findMatches = (usersCollection) => dispatch => {
  console.log("list in store:", usersCollection);
  
}

export const logout = async() => {
  await firebase.auth().signOut().then(function() {
    console.log("logged out");
    
  }).catch(function(error) {
    console.log(error);
    
  });
}

export const saveUser = user => dispatch => {
  const usersCollection = firebase.database().ref().child('users')
  usersCollection.push().set(user)

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
  .catch( e => {
    console.log("searchActivities error: ", e);
    
  })
}

export const loadUsersCollection = () => async(dispatch) => {//thyere still not unique
  const usersCollection = firebase.database().ref().child('users')
  usersCollection.once('value').then( function(snapshot) {
    let usersList = []
    // console.log("list", snapshot.val());
    for(const user in snapshot.val()) {
       usersList.push(snapshot.val()[user]);
    }
    dispatch({
      type: LOAD_USERS,
      payload: usersList
    })
  });
}

export const saveActivity = (activity, user) => dispatch => {
  // console.log(user);
  
  const usersCollection = firebase.database().ref().child('users')
  usersCollection.orderByChild("email").equalTo(user.email).on( "child_added", async function(snapshot) {
    const currentUserId = snapshot.key;
    await currentUserId;
    const currentUserRef = firebase.database().ref().child(`users/${currentUserId}/activities`);
    
    await currentUserRef.push({activity});
  })
  
  // dispatch({
    // type: SAVE_VENUE,
    // payload: activity
  // })
}