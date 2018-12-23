const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const firebase = require("firebase");
var axios = require('axios');
var tokens = require('./functionSecrets');
const yelpKey = tokens.yelpKey;
const dbConfig = {
  apiKey: tokens.firebaseKey,
  authDomain: "we-party-210101.firebaseapp.com",
  databaseURL: "https://we-party-210101.firebaseio.com",
  projectId: "we-party-210101",
  storageBucket: "we-party-210101.appspot.com",
  messagingSenderId: tokens.firebaseSender
};

firebase.initializeApp(dbConfig);

exports.signInUser = functions.https.onRequest((req, res) => {
  const email = req.body.email,
  password = req.body.password;
  const usersCollection = firebase.database().ref().child("users");
  
  cors( req, res, () => {
    usersCollection.once( "value")
    .then (snapshot => {
      for ( let uid in snapshot.val()){
        // there can only be one match so this should be fast
        if(snapshot.val()[uid].email && snapshot.val()[uid].email === email) {
          
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(function() {
            return firebase.auth().signInWithEmailAndPassword(email, password);
          })
          .then(singinResponse => {
            res.send({
              "code": 200,
              "message": "Success!",
              "uid": uid
            });
          })
          .catch( e => {
            res.send({
              "code": 400,
              "message": "Unable to create exisgting user's authenticated profile",
              "deleteThis": e
            });
          });
        } else if(!snapshot.val()[uid].email || snapshot.val()[uid].email !== email) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then( r => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
            .then(function() {
              return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .then(singinResponse => {
              res.send({
                "code": 200,
                "message": "Success!",
              });
            })
            .catch( e => {
              res.send({
                "code": 400,
                "message": "Unable to create user's authenticated profile",
                "deleteThis": e
              });
              
            })
          })
        }        
      }
    })
  })
});


exports.searchActivities = functions.https.onRequest( (req, res) => {
  let term = req.body.term, 
  yelpConfig = {
    headers: { Authorization: `Bearer ${yelpKey}` },
    params: {
      term: term,
      location: "montreal",
      limit: 12
    }
  };
  
  cors( req, res, () =>{
    axios
    .get(`https://api.yelp.com/v3/businesses/search`, yelpConfig)
    .then( yelpResponse => {
      if(yelpResponse.data.businesses){
        let results = yelpResponse.data.businesses;
        res.send({
          "code": 200,
          "results": results
        })
      } 
    })
    .catch(err => {
      res.send({ "code": 400, "message": "There was an issue with the search servers."});
    });
  })
});


exports.createActivity = functions.https.onRequest( (req, res) => {
  let activity = req.body.activity;
  
  cors(req, res, () => {
    firebase.database().ref().child("activities/unmatched/")
    .push().set(activity);
    res.send({
      "code": 200,
      "object": activity
    })
  })
});


exports.joinActivity = functions.https.onRequest( (req, res) => {
  cors( req, res, () => {
    let activity = req.body.activity,
    user = req.body.user,
    activityId = req.body.activity.id;

    activity.members.push(user);
    firebase.database().ref().child("activities/unmatched").once( "value", snapshot => {
      for(let key in snapshot.val()){
        if(snapshot.val()[key].id == activityId) {
          firebase.database().ref().child("activities/unmatched/" + key).remove()
          .then( r => {
            firebase.database().ref().child("matched")
            .push(activity)
          })
        }
      }
      res.send({
        "snapshot": snapshot.val()
      })
    })
    .catch( e => {
      res.send({
        "code": 400,
        "message": "Unable to join this activity. Please try again later"
      })
    })
  })
});


exports.retrieveJoined = functions.https.onRequest( (req, res) => {
  var user = req.body.user,
  groupList = [];
  
  cors( req, res, () => {
    firebase.database().ref().child("matched").once( "value", snapshot => {
      for( let key in snapshot.val()) {
        snapshot.val()[key].members.forEach( member => {
          if(member.email === user.email) {
            groupList.push(snapshot.val()[key]);            
          }
        })
      }
    })
    .then( r => {
      res.send({
        "matched": groupList
      })
    })
    .catch( e => [
      res.send({
        "error": e
      })
    ])
  })
});


/* ==========CHAT FUNCTIONS=============*/

exports.openChatRoom = functions.https.onRequest((req,res) => {
  let info = req.body.info;

  cors( req, res, () => {
    firebase.database().ref().child("chatRooms/" + req.body.info.key)
    .once("value")
    .then( snapshot => {
      if( !snapshot.val()) {
        firebase.database().ref().child("chatRooms/" + req.body.info.key).set(info);
      }
    })
    .catch( e => {
      console.log("unable to query chatrooms:", e);
    });
    res.send({
      "data": req.body.info.key
    })
  })
});


exports.getMsgHistory = functions.https.onRequest( (req, res) => {
  cors( req, res, () => {
    let roomId = req.body.id;

    firebase.database().ref().child(`chatRooms/${roomId}`).once("value")
    .then(snapshot => {
      res.send({
        "msgs": snapshot.val()
      });
    })
    .catch( e => {
      console.log("msg history error", e);
    });
  })
});


exports.sendMessage = functions.https.onRequest ((req, res) => {
  cors(req, res, () => {
    let roomId = req.body.data.msgInfo.roomId, 
    message = req.body.data.msgInfo.message,
    name = req.body.name? req.body.name : "N/A",
    email = req.body.data.msgInfo.email;
    
    firebase.database().ref().child(`chatRooms/${roomId}/messages`).push({message, email, name});
    firebase.database().ref().child(`chatRooms/${roomId}`).once("value")
    .then( snapshot => {
      res.send({
        "messages":snapshot.val().messages
      });
    });
  })
});
