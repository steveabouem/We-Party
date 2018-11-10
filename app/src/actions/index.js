import { dbConfig } from "../config/firebase";
import { LOGIN, LOAD_USERS, LOAD_ACTIVITIES, SEARCH_VENUE, RETRIEVEMATCH, SAVE_VENUE } from "./types";
import axios from "axios";

const firebase = require("firebase");

firebase.initializeApp(dbConfig);

export const createAuthUser = ( email, password) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch( e => {
    console.log("unable to create auth object", e);
  });
  firebase.auth().signInWithEmailAndPassword(email, password)
  console.log("user logged in");
}

export const saveUser = user => dispatch => {
  const usersCollection = firebase.database().ref().child('users');
  
  //create user ref
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
      usersCollection.push().set(user)
      dispatch({
        type: LOGIN,
        payload: user
      })
    }
  })
};

export const findMatches = () => dispatch => {
  const group = document.getElementById("how-many").value;
  const budget = document.getElementById("budget-selected").innerText;
  const genders = document.getElementById("gender-selected").innerText;
  const data = { group: group, genders: genders, budget: budget}
  const activitiesCollection = firebase.database().ref().child('activities');
  
  activitiesCollection.orderByKey().once('value').then( async function(snapshot){
  })
}

export const logout = async() => {
  await firebase.auth().signOut().then(function() {
    console.log("logged out");
    
  }).catch(function(error) {
    console.log(error);
    
  });
}


export const searchActivities = (search) => async(dispatch) => {
  console.log("search", search);
  
  let payload;
  await axios.post("https://us-central1-we-party-210101.cloudfunctions.net/searchActivities", 
  {headers: 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }
  }, 
  {data: {term: `${search}`}})
  .then(res => {
    console.log("action post to cloud funct: ", res);
    
    payload = res.data;
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
};

export const loadUsersCollection = () => async(dispatch) => {
  const usersCollection = firebase.database().ref().child('users')
  usersCollection.once('value').then( function(snapshot) {
    let usersList = []
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
  return;
}

