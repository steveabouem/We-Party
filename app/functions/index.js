const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const firebase = require("firebase");
var axios = require('axios');
const yelpKey = "woO7hOWfngBu9aeNH8cMaN0g4p7_u0IzDZ5JFvjwhu0aqAItRM-5HijZhO3JY_TwmEVq3kFpnh0Ss5yBBHYYFTZPeCtuXStFKtdmO93SILH3b-RNgeyvOisyIWpNW3Yx";
const dbConfig = {
  apiKey: "AIzaSyA7YCkMaXdtsZlTpz4VFYlqoVsEr3Lg-p0",
  authDomain: "we-party-210101.firebaseapp.com",
  databaseURL: "https://we-party-210101.firebaseio.com",
  projectId: "we-party-210101",
  storageBucket: "we-party-210101.appspot.com",
  // messagingSenderId: tokens.firebaseSender
};

const stripe = require("stripe")("sk_test_vdtVPJ5w24tJ5zdRHLcVvxUH");
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(sendGridKey);
firebase.initializeApp(dbConfig);

exports.sendEmail = functions.https.onRequest( (req, res) =>{
  cors( req, res, () =>{
    let email = req.body.email,
    subject = req.body.subject,
    content = req.body.content;

    const emailSent = {
      to: email,
      from: 'weparty@tonight.live',
      subject: subject,
      text: content,
      html: `<div style="background: white; padding: 5px">\
              <h1 style="color: #a70063">We Party</h1>\
              <div style="background: #ebebeb;\
                color: #710000;\
                width: 80%;\
                padding: 5px;\
                colorr: red;\
                margin: auto;\
                border: 1px solid black;">\
                <h1>Title</h1>\
                <p>\
                  ${content}\
                </p>\
              </div>\
              <div>\
              </div>\
              <div><span><a style="text-decoration: none; color:pink">Unsubscription link</a>\
                </span></div><p>Weparty trademark, tagline and social links</p>\
            </div>`,
    };
    sgMail.send(emailSent)
    .then( r => {
      res.send({
        "code": 200,
        "email": {"email": emailSent, "resp": r, "req": req.body}
      });
    })
    .catch( e => {
      console.log("email error?", e);
      res.send({
        "error": e, "req": req.body
      });
    });
  });

    
});


exports.saveUser = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let userInfo = req.body.userInfo;
    let data = {displayName: userInfo.displayName, email: userInfo.email, photoURL: userInfo.photoURL, uid: userInfo.uid, timesUsed: 0};
    console.log("info received", userInfo);
    firebase.database().ref().child("users/" + userInfo.uid).once("value", snapshot => {
    console.log("db querried", snapshot.val());
      if(!snapshot.val()) {
        firebase.database().ref().child("users/" + userInfo.uid).set(data)
        .then( () => {
          res.send({
            "code": 200,
            "data": "User has been saved succesfully!"
          });
        })
        .catch( e => {
          res.send({
            "code": 500,
            "data": "Review saved user data."
          });
        })
      } else {
        res.send({
          "code": 204,
          "data": "User already exists!"
        });
      }
    });
  });
});

exports.countSearches = functions.https.onRequest( (req, res) => {
  cors(req, res, () => {
    let uid = req.body.userInfo.uid;
    firebase.database().ref().child("users/" + uid).once("value", snapshot => {
      let currentTimesUsed = snapshot.val().timesUsed +=1;
      firebase.database().ref("users/" + uid).update({
        timesUsed: currentTimesUsed
      })
      .then( res => {
        res.send({
          "code": 200,
          "data": res
        });
      })
      .catch( e => {
        res.send({
          "code": 500,
          "data": e
        });
      });
    });
  });
});

exports.createStripeCustomer = functions.https.onRequest( (req, res) => {
  cors( req, res, () => {
    let customer = req.body.customer,
    currentUser = firebase.database().ref().child("users/" + customer.uid);
    
    currentUser.once("value", snapshot => {
      if(!snapshot.val().balance) {
        customer = stripe.customers.create({customer})
        .then( customer => {
          currentUser.update({balance: 0});
          res.send({
            code: 200,
            userStripeinfo: {
              balance: customer.account_balance,
              email: customer.email,
            }
          })
        })
        .catch( e =>{
          res.send({
            e
          });
        });
      } else {
        res.send({
          code: 201,
          data: "USer is already registered in Stripe!"
        })
      }
    })
  });
});

exports.retrieveUser = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let uid = req.body.uid;

    firebase.database().ref().child("users/" + uid).once("value", snapshot => {
      res.send({
        "data": snapshot.val()
      });
    })
  });
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
          "data": results
        })
      } 
    })
    .catch(e => {
      res.send({ "code": 500, "message": "There was an issue with the search servers.", e});
    });
  })
});

exports.createActivity = functions.https.onRequest( (req, res) => {
  let activity = req.body.activity,
  key = req.body.key,
  uid = req.body.uid;
  
  cors(req, res, () => {
    firebase.database().ref().child("activities/unmatched/" + key).set(activity);
    // ADD up the number of created activities
    firebase.database().ref().child("users/" + uid).once("value", snapshot => {
      let currentTimesUsed = snapshot.val().timesUsed +=1;
      firebase.database().ref("users/" + uid).update({
        timesUsed: currentTimesUsed
      })
      .catch( e => {
        res.send({
          "code": 500,
          "data": "Adding up activities caused an error!"
        });
      });
    });

    firebase.database().ref().child("activities").once("value", snapshot => {
      res.send({
        "code": 200,
        "data": {activity: activity, allActivities: snapshot.val()}
      });
    });
  })
});

exports.joinActivity = functions.https.onRequest( (req, res) => {
  cors( req, res, () => {
    let activity = req.body.activity,
    user = req.body.user,
    key = req.body.activity.key;
    
    firebase.database().ref().child("activities/unmatched/" + key).once("value", snapshot => {
      if(activity.members.length === parseInt(snapshot.val().group)) { //Remove the unmatched ref once the group is full
        firebase.database().ref().child("activities/unmatched/" + key).remove();
      } else {
        firebase.database().ref().child("activities/unmatched/" + key + "/members").push(user);
      }
    });
    
    firebase.database().ref().child("activities/matched/" + key).set(activity);
    firebase.database().ref().child("activities").once("value", snapshot => {
      res.send({
        "code": 200,
        "data": snapshot.val()
      });
    });
  });
});

exports.deleteActivity = functions.https.onRequest( (req, res) => {
  cors( req, res, ()=> {
    let key = req.body.key,
    isMatched = req.body.isMatched;
    
    switch (isMatched) {
      case "no":
        firebase.database().ref().child("activities/unmatched/" + key).remove();
        firebase.database().ref().child("activities").once("value", snapshot => {
          res.send({
            "code": 200,
            "data": snapshot.val()
          });
        })
        .catch( e => {
          res.send({
            "code": 500,
            "message": "Error while deleting unmatched activity", e          
          });
        });
        break;

      case "yes":
        firebase.database().ref().child("activities/matched/" + key).remove();
        firebase.database().ref().child("chatRooms/" + key).remove();
        firebase.database().ref().child("activities").once("value", snapshot => {
          res.send({
            "code": 200,
            "data": snapshot.val()
          });
        })
        .catch( e => {
          res.send({
            "code": 500,
            "message": "Error while deleting matched activity", e })
        });
        break;
      default:
        return;
    }
  });
});

exports.retrieveJoined = functions.https.onRequest( (req, res) => {
  var user = req.body.user,
  groupList = [];
  
  cors( req, res, () => {
    firebase.database().ref().child("activities/matched").once( "value", snapshot => {
      if(snapshot.val()){
        for( let key in snapshot.val()) {
          snapshot.val()[key].members.forEach( member => {
            if(member && member.email === user.email) {
              groupList.push(snapshot.val()[key]);            
            }
          });
        }
      }
    })
    .then( r => {
      res.send({
        "code": 200,
        "data": groupList
      })
    })
    .catch( e => [
      res.send({
        "code": 500,
        "message": "Error while joining group", e
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
      "code": 200,
      "data": req.body.info.key
    });
  })
});

exports.getMsgHistory = functions.https.onRequest( (req, res) => {
  cors( req, res, () => {
    let roomId = req.body.id;

    firebase.database().ref().child(`chatRooms/${roomId}`).once("value")
    .then(snapshot => {
      res.send({
        "code": 200,
        "data": snapshot.val()
      });
    })
    .catch( e => {
      res.send({
        "code": 500,
        "message": "msg history error", e
      });
    });
  })
});

exports.sendMessage = functions.https.onRequest ((req, res) => {
  cors(req, res, () => {
    let roomId = req.body.data.msgInfo.roomId, 
    message = req.body.data.msgInfo.message,
    name = req.body.data.msgInfo.name? req.body.data.msgInfo.name : "N/A",
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