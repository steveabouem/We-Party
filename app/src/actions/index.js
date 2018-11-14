import { dbConfig } from "../config/firebase";
import { LOGIN, LOGGED_IN, LOAD_USERS, LOAD_ACTIVITIES, SEARCH_VENUE, RETRIEVEMATCH, SAVE_VENUE } from "./types";
import axios from "axios";

const firebase = require("firebase");

firebase.initializeApp(dbConfig);

export const createAuthUser = ( userObject) => dispatch => {
  console.log("object in create user action", userObject);
  
  firebase.auth().createUserWithEmailAndPassword(userObject.email, userObject.password)
  .then( r => {
    // only sign in if no error
    firebase.auth().signInWithEmailAndPassword(userObject.email, userObject.password)
    console.log("user logged in: ", userObject.email);
    
    dispatch({
      type: LOGIN,
      payload: {name: userObject.name, email: userObject.email, oauth: "form", picture: null}
    })
  })
  .catch( e => {
    console.log("unable to create auth object", e);
    
  });
};


export const retrieveAuthUser = () => dispatch => {
  var user = firebase.auth().currentUser;
  
  if (user) {
    dispatch({
      type: LOGGED_IN,
      payload: user   
    });
    
  } else {
    dispatch({
      type: LOGGED_IN,
      payload: null
    })
  }
};


export const saveUser = (userObject) => dispatch => {
  
  console.log("User located, creating usercollection ref", userObject);
  const usersCollection = firebase.database().ref().child('users');
  let safeUserObject = {name: userObject.name, email: userObject.email, oauth: "form", picture: userObject.picture}
  
  //create user ref, I need this on top of the auth to add all the other k/v pairs
  usersCollection.orderByChild("email").equalTo(userObject.email).on( "value", async function (snapshot){
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
      usersCollection.push().set(safeUserObject);
      
      dispatch({
        type: LOGIN,
        payload: safeUserObject
      })
    }
  })
};

export const searchActivities = (search) => async(dispatch) => {
  
  let payload;
  await axios.post("https://us-central1-we-party-210101.cloudfunctions.net/searchActivities", 
  {headers: 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }
  }, 
  {data: {term: `${search}`}})
  .then(res => {
    
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
};


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
};


export const pushNewMember = ( currentUser, match) => dispatch => {
  console.log("working with" +  currentUser  + "and" + match);
  
  const activitiesCollection = firebase.database().ref().child('activities');
  
  activitiesCollection.orderByChild("venue").on( "value", function(snapshot) {
    console.log("query val", snapshot.val());
    
    for( let activityKey in snapshot.val() ) {
      let updates = {};
      updates["/activities/" + activityKey + "/members/1"] = currentUser;
      
      firebase.database().ref().update( updates )
      console.log("val", activityKey);
      
      
    }

    console.log("snapshot updated", snapshot.val());
  })
};


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
};


export const logout = async() => {
  await firebase.auth().signOut().then(function() {
    console.log("logged out");
    
  }).catch(function(error) {
    console.log(error);
    
  });
}

