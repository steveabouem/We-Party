import { dbConfig } from "../config/firebase";
import { LOGIN, LOGGED_IN, LOAD_USERS, LOAD_ACTIVITIES, SEARCH_VENUE, SAVE_VENUE, RENDER_JOINED, ERROR } from "./types";
import axios from "axios";

/* ==========GLOBAL SCOPE VARIABLES=============*/
const firebase = require("firebase");
firebase.initializeApp(dbConfig);
const usersCollection = firebase.database().ref().child('users');
const activitiesCollection = firebase.database().ref().child('activities');
var updates = {};
/* ==========(end)=============*/



export const createAuthUser = ( userObject) => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(userObject.email, userObject.password)
  .then( r => {
    // only sign in if no error
    firebase.auth().signInWithEmailAndPassword(userObject.email, userObject.password)
    
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
  
  let  user = firebase.auth().currentUser;
  
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
  
  let userId = firebase.auth().currentUser.uid;
  let safeUserObject = {name: userObject.name, email: userObject.email, oauth: "form", picture: userObject.picture};
  
  firebase.database().ref("/users/" + userId).set({
    name: userObject.name,
    email: userObject.email,
    oAuth: userObject.oAuth,
    picture: userObject.picture,
    joinedGroups: []
  })
  .then ( () => {
    dispatch({
      type: LOGIN,
      payload: safeUserObject
    })
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: true
    })
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
    dispatch({
      type: ERROR,
      payload: true
    })
  })
  
  dispatch({
    type: SEARCH_VENUE,
    payload: payload.data.businesses
  })
};


export const createActivity = activity => dispatch => {
  let activitiesList = [];
  
  // activitiesCollection is defined at the top of the doc
  activitiesCollection.push(activity)
  
  activitiesCollection.once('value').then( function(snapshot) {
    for(const activity in snapshot.val()) {
      activitiesList.push(snapshot.val()[activity]);
    }
    
    dispatch({
      type: SAVE_VENUE,
      payload: activitiesList
    })
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: true
    })
  })
};


export const loadUsersCollection = () => async(dispatch) => {
  // usersCollection is defined at the top of the doc
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


export const addJoinedRef = (userOnline, activityJoined, activityKey) => dispatch => {
  
  let userUpdate = {};
  
  userUpdate["/users/joined/" + activityKey] = {user: userOnline, activity: activityJoined};
  firebase.database().ref().update( userUpdate)
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: true
    })
  });
  
};


export const pushNewMember =  ( currentUser, match) => dispatch => {
  // activitiesCollection is defined at the top of the doc
  activitiesCollection.orderByValue().on( "value", async function(snapshot) {
    await snapshot.val();
    
    let dbResult = snapshot.val();
    
    for( let activityKey in dbResult ) {
      
      // FOR SOME REASON, JUST COMPARING THE 2 OBJECTS DOESNT Worke, I
      //  HAVE TO COMPARE EACH KEY INDIVIDUALLY??, TO BE INVESTIGATED
      if(dbResult[activityKey].creator.email !== currentUser.email
        && dbResult[activityKey].venue === match.venue
        && dbResult[activityKey].created === match.created 
        && dbResult[activityKey].group === match.group 
        && dbResult[activityKey].contribution === match.contribution 
        && match.contact === dbResult[activityKey].contact){
          
          let newIndex = dbResult[activityKey].members.length;
          
          updates["/activities/" + activityKey + "/members/" + newIndex ] = currentUser;
          await addJoinedRef(currentUser, match, activityKey);
          
        } else if (dbResult[activityKey].creator.email === currentUser.email) {
          dispatch({
            type: ERROR,
            payload: "Cannot create and join at the same time"
          })
        }
      }
    })
    
    firebase.database().ref().update( updates );
  };
  
  
  export const retrieveJoinedProps = email => dispatch => {
    var payload;
    
    if(email) {
      usersCollection.orderByValue().on( "value", snapshot => {
        
        for( let joinedKey in snapshot.val().joined ) {
          
          if(snapshot.val().joined[joinedKey].user.email === email) {
            payload = {user: snapshot.val().joined[joinedKey].user, activity: snapshot.val().joined[joinedKey]};
            
          }
        }
        
        dispatch({
          type: RENDER_JOINED,
          payload: payload
        })
      })
    }
  };
  
  
  export const loadActivitiesCollection = () => dispatch => {
    let activitiesList = [];
    
    // activitiesCollection is defined at the top of the doc
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
      
    }).catch(function(ERROR) {
      console.log(ERROR);
      
    });
  }
  
  