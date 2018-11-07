import { dbConfig } from "../config/firebase";
import { LOGIN, LOAD_USERS, LOAD_ACTIVITIES, SEARCH_VENUE, RETRIEVEMATCH, SAVE_VENUE } from "./types";
import axios from "axios";
const CircularJSON = require('circular-json');

const firebase = require("firebase");

firebase.initializeApp(dbConfig);

export const callFunctions = () => async(dispatch) => {
  axios.get("/authenticate")
  .then(r => {
    console.log(r);
    
  })
  .catch(e => {
    console.log(e);
    
  })
  
}

export const findMatches = () => dispatch => {
  const group = document.getElementById("how-many").value;
  const budget = document.getElementById("budget-selected").innerText;
  const genders = document.getElementById("gender-selected").innerText;
  const data = { group: group, genders: genders, budget: budget}
  const activitiesCollection = firebase.database().ref().child('activities');
  
  activitiesCollection.orderByKey().once('value').then( async function(snapshot){
    console.log("match snapshot", snapshot.val());
  })
}

export const logout = async() => {
  await firebase.auth().signOut().then(function() {
    console.log("logged out");
    
  }).catch(function(error) {
    console.log(error);
    
  });
}

export const saveUser = user => dispatch => {
  const usersCollection = firebase.database().ref().child('users');
  
  usersCollection.orderByChild("email").equalTo(user.email).on( "value", async function (snapshot){
    if(snapshot.val()){
      const currentuserId = snapshot.node_.children_.root_.key;
      usersCollection.orderByKey().equalTo(currentuserId).on("value", function (snapshot){
        const currentuserObject = snapshot.val()[Object.keys(snapshot.val())[0]];
        
        dispatch({
          type: LOGIN,
          payload: currentuserObject
        })
      })
      
    } else {
      console.log("new", user);
      usersCollection.push().set(user)
      dispatch({
        type: LOGIN,
        payload: user
      })
    }
  })
};

export const searchActivities = (search) => async(dispatch) => {
  let payload;
  await axios.get("https://us-central1-we-party-210101.cloudfunctions.net/searchActivities", {headers: { Authorization: `Bearer ${dbConfig.apiKey}`}})
  .then(res => {
    payload = res.data
    console.log(" search venue res: ", payload);
    res.send(payload.data.businesses);
  })
  .catch( e => {
    console.log("searchActivities error: ", e);
  })

  dispatch({
    type: SEARCH_VENUE,
    payload: payload.data.businesses
  })
}

export const createActivity = activity => dispatch => {
  let activitiesList = [];
  const activitiesCollection = firebase.database().ref().child('activities');
  activitiesCollection.push(activity)
  
  activitiesCollection.once('value').then( function(snapshot) {
    for(const activity in snapshot.val()) {
      activitiesList.push(snapshot.val()[activity]);
    }
    
    dispatch({
      type: SAVE_VENUE,
      payload: activitiesList
    })
  });
  console.log("list", activitiesList);
};

export const loadUsersCollection = () => async(dispatch) => {
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

export const loadActivitiesCollection = () => dispatch => {
  const activitiesCollection = firebase.database().ref().child('activities')
  let activitiesList = []
  activitiesCollection.once('value').then( function(snapshot) {
    for(const activity in snapshot.val()) {
      activitiesList.push(snapshot.val()[activity]);
    }
  });
  dispatch({
    type: LOAD_ACTIVITIES,
    payload: activitiesList
  })
  console.log("list", activitiesList);
  return;
}

export const loadActivities = (users) => dispatch => {
  console.log("object 2 procss", users);
}

export const deleteActivity = (activity) => dispatch => {
  
}