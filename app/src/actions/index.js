import { dbConfig } from "../config/firebase";
import { LOGIN, LOGGED_IN, LOAD_USERS, LOAD_ACTIVITIES, SEARCH_VENUE, SAVE_VENUE, RENDER_JOINED, ERROR, OPEN_CHAT, MSG_HISTORY, NEW_MSG } from "./types";
import axios from "axios";

/* ==========GLOBAL SCOPE VARIABLES=============*/
const firebase = require("firebase");
firebase.initializeApp(dbConfig);
const usersCollection = firebase.database().ref().child('users');
const activitiesCollection = firebase.database().ref().child('activities');
var updates = {};
/* ==========(end)=============*/



export const createAuthUser = ( userObject) => dispatch => {
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/signInUser", 
  {headers: 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }
  }, 
  {data: {"email": `${userObject.email}`, "password": `${userObject.password}`}})
  .then( r => {
    if(r.data.code === 200){
      dispatch({
        type: LOGIN,
        payload: {name: userObject.name, email: userObject.email, oauth: "form", picture: null}
      })
    } else if ( r.data.code === 400) {
      dispatch({
        type: ERROR,
        payload: r.data.message
      })
    } 
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: "Unable to create user auth. higher level error"
    })
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
    res.send(payload.results);
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: true
    })
  })
  
  dispatch({
    type: SEARCH_VENUE,
    payload: payload.results
  })
};


export const createActivity = activity => dispatch => {
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/createActivity",
  {headers: 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }
  }, 
  { data: {"activity": activity} }
  )
  .then( r => {
    activitiesCollection.once("value", snapshot => {
      dispatch({
        type: SAVE_VENUE,
        payload: snapshot.val()
      });
    })
  })
};


export const pushNewMember =  ( currentUser, match) => dispatch => {
  
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/joinActivity",
  {headers: 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }}, 
    { data: {"activity": match, "user": currentUser}})
    .then(r => {
    })
    .catch(e => {
      console.log("error", e);
      dispatch({
        type: ERROR,
        payload: "Couldnt join activity"
      })
    })
  };
  
  
  export const retrieveJoinedProps = user => dispatch => {
    axios.post("https://us-central1-we-party-210101.cloudfunctions.net/retrieveJoined",
    
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }, 
    { data: {"user": user}}
    )
    .then( r => {
      dispatch({
        type: RENDER_JOINED,
        payload: r.data.matched
      })      
    })
    .catch( e => {
      dispatch({
        type: ERROR,
        payload: e
      })      
    })
  };
  
  const convertObject = (object, array) => {
    for( let key in object){
      array.push(object[key])
    }
  };
  
  export const loadActivitiesCollection = () => dispatch => {
    let activitiesList = {matched: [], unmatched: []};
    // activitiesCollection is defined at the top of the doc
    firebase.database().ref().child("activities/unmatched").once('value').then( function(snapshot) {
      // PREVENT CRASH IF NO ACTIVITY CREATED YET
      if(snapshot.val()) {
        convertObject(snapshot.val(), activitiesList.unmatched)
      }
    })
    .then( () => {
      firebase.database().ref().child("matched").once( "value", snapshot => {
        if(snapshot.val()) {
          convertObject(snapshot.val(), activitiesList.matched)
        }
      })
    })
    
    dispatch({
      type: LOAD_ACTIVITIES,
      payload: activitiesList
    })
    
    return;
  }
  
  
  export const logout = () => dispatch => {
    firebase.auth().signOut().then(function() {
      
    }).catch(e => {
      dispatch({
        type: ERROR,
        payload: e
      })
    });
  }
  
  /* ==========CHAT ACTIONS=============*/
  export const openChatRoom = (index, activity, user) => dispatch => {
    
    let roomName = `${activity.venue}_${activity.created}`,
    roomInfo = {
      name: roomName,
      messages: [],
      firsUser: user,
      activity: activity,
      key: `${activity.id}`
    };

    axios.post("https://us-central1-we-party-210101.cloudfunctions.net/openChatRoom", 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }, 
    { data: {"info": roomInfo}}
    )
    .then( r => {
      dispatch({
        type: OPEN_CHAT,
        payload: {chatkey: r.data.data, status: "open", room: roomName} 
      })
    })
    .catch( e => {
      dispatch({
        type: ERROR,
        payload: e
      })
    })
    
  };
  
  export const getMsgHistory = key => dispatch => {
    axios.post("https://us-central1-we-party-210101.cloudfunctions.net/getMsgHistory",
      {headers: 
        { Authorization: `Bearer ${dbConfig.apiKey}`,
        "content-type": "application/json" },
        data:{"id":key}
      })
      .then( r =>{
        console.log("áction r", r);
        
        dispatch({
          type:MSG_HISTORY,
          payload: { msgs: r.data.msgs, roomId: key }
        })
      })
      .catch( e => {
        dispatch({ 
          type: ERROR,
          payload: e
        })
      })
  };


  export const sendMessage = msg => dispatch => {
    let object = {
      "message": msg.message,
      "sender": msg.name,
      "email": msg.email,
      "roomId": msg.roomId
    };
    
    axios.post("https://us-central1-we-party-210101.cloudfunctions.net/sendMessage", 
    {headers: 
      { Authorization: `Bearer ${dbConfig.apiKey}`,
      "content-type": "application/json" },
      data:{"msgInfo": object}
    })
    .then( r => {
      dispatch({
        type: NEW_MSG,
        payload: r.data.messages
      })
    })
    .catch( e => {
      console.log("send msg action error", e);
    })
  }
  