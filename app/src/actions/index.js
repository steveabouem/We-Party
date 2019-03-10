import { dbConfig } from "../config/firebase";
import { LOGIN, LOGGED_IN, LOAD_USERS, LOAD_ACTIVITIES, SEARCH_VENUE, SAVE_VENUE, RENDER_JOINED, ERROR, OPEN_CHAT, MSG_HISTORY, NEW_MSG } from "./types";
import axios from "axios";

/* ==========GLOBAL SCOPE =============*/
var updates = {};

const firebase = require("firebase");
firebase.initializeApp(dbConfig);
const usersCollection = firebase.database().ref().child('users'),
activitiesCollection = firebase.database().ref().child('activities'),
convertObject = (object, array) => {
  for( let key in object){
    array.push(object[key]);
  }
};

/* ==========(end)=============*/

export const randomKey = () => dispatch => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const signinWithPassword = (username, password) => {
  
}

export const sendLink = (email, username) => dispatch =>{
var actionCodeSettings = {
  url: 'http://localhost:3000/fulfill/' + username ,
  handleCodeInApp: true,
  };

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(function() {
    window.localStorage.setItem('emailForSignIn', email);
    dispatch({
      type: ERROR,
      payload: null //Resets message prop in case an error was previously made
    });
  })
  .catch(function(e) {
    dispatch({
      type: ERROR,
      payload: e.message
    });
  });
}

export const confirmLink = (username) => async dispatch => {
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem('emailForSignIn');

    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    await firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(currentUser) {
        dispatch({
          type: LOGIN,
          payload:{chosenName: username}
        });
      })
      .catch(function(e) {
        dispatch({
          type: ERROR,
          payload: e.message
        })
      });
      window.localStorage.removeItem('emailForSignIn');
  }  
};

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
      });
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
    });
  }
};

export const saveUser = (userObject) => dispatch => {
  let userId = firebase.auth().currentUser.uid,
  safeUserObject = {name: userObject.name, email: userObject.email, oauth: "form", picture: userObject.picture };
  
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
    });
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: true
    })
  });
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
    });
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
  });
  
  if(payload.data.length === 0) {
    dispatch({
      type: SEARCH_VENUE,
      payload: "No results found:("
    });
  } else {
    dispatch({
      type: SEARCH_VENUE,
      payload: payload.data
    });
  }
};

export const createActivity = activity => dispatch => {
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/createActivity",
  {headers: 
    { Authorization: `Bearer ${dbConfig.apiKey}`,
    "content-type": "application/json" }
  }, 
  { data: {"activity": activity, key: activity.key} })
  .then( r => {
    dispatch({
      type: SAVE_VENUE,
      payload: r.data
    });
  });
};

export const deleteActivity = activity => dispatch => {
  let payload = [];
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/deleteActivity",
  {headers: 
  { Authorization: `Bearer ${dbConfig.apiKey}`,
  "content-type": "application/json" }}, 
  { data: {"key": activity.key, "isMatched": activity.isMatched}})
  .then( r => {
    if (activity.isMatched === "no") {
      convertObject(r.data.data.unmatched,payload)
    } else {
      convertObject(r.data.data.matched,payload)
    }
    
    dispatch({
      type: LOAD_ACTIVITIES,
      payload: payload
    });
  })
  .catch(e => {
    dispatch({
      type: ERROR,
      payload: "Couldnt join activity", e
    })
  });
}

export const pushNewMember =  ( currentUser, match) => dispatch => {
  match.members.push(currentUser);
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/joinActivity",
  {headers: 
  { Authorization: `Bearer ${dbConfig.apiKey}`,
  "content-type": "application/json" }}, 
  { data: {"activity": match, "user": currentUser}})
    .then(r => {
    dispatch({
      type: LOAD_ACTIVITIES,
      payload: r.data
    });
  })
  .catch(e => {
    dispatch({
      type: ERROR,
      payload: "Couldnt join activity", e
    });
  });
};
    
export const retrieveJoinedProps = user => dispatch => {
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/retrieveJoined",
  {Authorization: `Bearer ${dbConfig.apiKey}`,
  "content-type": "application/json" }, 
  {data: {"user": user}})
  .then( r => {
    dispatch({
      type: RENDER_JOINED,
      payload: r.data.matched
    }); 
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: e
    });    
  });
};
    
export const loadActivitiesCollection = () => dispatch => {
  let activitiesList = {matched: [], unmatched: []};
  // activitiesCollection is defined at the top of the doc
  firebase.database().ref().child("activities").once('value').then( snapshot => {
    if(snapshot.val()) {
      convertObject(snapshot.val().matched, activitiesList.matched);
      convertObject(snapshot.val().unmatched, activitiesList.unmatched);
      dispatch({
        type: LOAD_ACTIVITIES,
        payload: activitiesList
      });
    }
  })
  .catch( e => {
    dispatch({
      type: ERROR,
      payload: e
    });
  })
}
    
export const logout = () => dispatch => {
  firebase.auth().signOut()
  .catch(e => {
    dispatch({
      type: ERROR,
      payload: e
    });
  });
  firebase.auth().setPersistence.NONE;
}

/* ==========EMAIL ACTIONS=============*/
export const sendEmail = (email, subject, content) => dispatch => {
  // axios.post("https://us-central1-we-party-210101.cloudfunctions.net/sendEmail",
  // {Authorization: `Bearer ${dbConfig.apiKey}`,
  // "content-type": "application/json" }, 
  // {data: {"email": email,
  // "subject": subject,
  // "content": content
  // }})
  // .catch(e => {
  //   dispatch({
  //     type: ERROR,
  //     payload: e
  //   });
  // });
};

/* ==========CHAT ACTIONS=============*/
export const openChatRoom = (index, activity, user) => dispatch => {
  let roomName = `${activity.venue}_${activity.created}`,
  roomInfo = {
    name: roomName,
    messages: [],
    activity: activity,
    key: activity.key
  };
  
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/openChatRoom", 
  { Authorization: `Bearer ${dbConfig.apiKey}`,
  "content-type": "application/json" }, 
  { data: {"info": roomInfo}})
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
    });
  });
};
    
export const getMsgHistory = key => dispatch => {
  axios.post("https://us-central1-we-party-210101.cloudfunctions.net/getMsgHistory",
  {headers: 
  { Authorization: `Bearer ${dbConfig.apiKey}`,
  "content-type": "application/json" }}, 
  { data: {"id": key}})
  .then( r => {
    dispatch({
      type:MSG_HISTORY,
      payload: { msgs: r.data.msgs, roomId: key }
    });
  })
  .catch( e => {
    dispatch({ 
      type: ERROR,
      payload: e
    });
  });
};
      
export const sendMessage = msg => dispatch => {
  let object = {
    "message": msg.message,
    "name": msg.name,
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
    dispatch({
      type: ERROR,
      payload: e
    });
  })
}

/* ==========MODAL ACTIONS=============*/
export const clearPastMessages = () => dispatch => {
  dispatch({
    type: MSG_HISTORY,
    payload: []
  });
};

export const confirmModalAction = (callBack) => dispatch =>{
  if(callBack !== undefined) {
    callBack();
  } 
};