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
const query = firebase.database().ref();

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
// You need to verify by email to avoid same email having as many accounts as login mechanisms
  cors(req, res, () => {
    let userInfo = req.body.userInfo;
    let data = {displayName: userInfo.displayName, email: userInfo.email, photoURL: userInfo.photoURL, uid: userInfo.uid, timesUsed: 0};

    query.child("users").once("value", snapshot => {
      let duplicate = 0;
      if(snapshot.val()) {
        // loop through existing users to avoid dup emails
        for(let key in snapshot.val()) {
          if(snapshot.val()[key].email === userInfo.email) {
            res.send({
              code: 400,
              data: "User already exists!"
            })
          }
        }

        // if no duplicate, create user
        query.child("users/" + userInfo.uid).set(data)
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
        query.child("users/" + userInfo.uid).set(data)
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
      } 
    });
  });
});

exports.updateUser = functions.https.onRequest( (req, res) => {
  cors(req, res, () => {
    let uid = req.body.uid,
    update = req.body.update;

    query.child("users/" + uid).once("value", snapshot => {
      if(snapshot.val()) {
        query.child("users/" + uid).update(update)
        .then( () => {
          // this update doesnt return a response
          res.send({
            code: 200,
            data: snapshot.val()
          });
        })
      } else {
        res.send({
          code: 400,
          data: "User not found"
        });
      }
    })
    .catch( e => {
      res.send({
        code: 500,
        data: e
      });
    })
  });
});

exports.countSearches = functions.https.onRequest( (req, res) => {
  cors(req, res, () => {
    let uid = req.body.userInfo.uid;
    query.child("users/" + uid).once("value", snapshot => {
      let currentTimesUsed = snapshot.val().timesUsed +=1;
      query.child("users/" + uid).update({
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
    currentUser = query.child("users/" + customer.uid);
    
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
  let user = {};
  cors(req, res, () => {
    let uid = req.body.uid;

    query.child("users/" + uid).once("value", snapshot => {
      if(snapshot.val()) {
        user = {
          displayName: snapshot.val().displayName, email: snapshot.val().email,
          photoURL: snapshot.val().photoURL, timesUsed: snapshot.val().timesUsed, uid}
          res.send({
            "data": user
          });
      }
    })
  });
});

exports.searchActivities = functions.https.onRequest( (req, res) => {
  let term = req.body.term,
  resultAddresses,
  results,
  existingGroups = {matched: [], unmatched: []};
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
        results = yelpResponse.data.businesses;

        resultAddresses = results.map( result => {
          return result.location.address1;
        });

        query.child("activities/matched").once( "value", snapshot => {
          if(snapshot.val()) {
            let probe = Object.keys(snapshot.val()).filter(key => {
              if(resultAddresses.includes(snapshot.val()[key].location)){
                existingGroups.matched.push(snapshot.val()[key]);
              }
              console.log({resultAddresses});
              
              return resultAddresses.includes(snapshot.val()[key].location);
            });
          }
        })
        .then(() => {
          query.child("activities/unmatched").once( "value", snapshot => {
            if(snapshot.val()) {
              let probe = Object.keys(snapshot.val()).filter(key => {
                if(resultAddresses.includes(snapshot.val()[key].location)){
                  existingGroups.unmatched.push(snapshot.val()[key]);
                }
                return resultAddresses.includes(snapshot.val()[key].location);
              });
            }
          })
          .then(() => {
            res.send({
              "code": 200, 
              "data": {results, existingGroups}
            });
          })
        })
      }
    })
    .catch( e => {
      console.log({e});
      res.send({ "code": 500, "message": "There was an issue with the search servers.", e});
    })
  })
});

exports.createActivity = functions.https.onRequest( (req, res) => {
  let activity = req.body.activity,
  uid = req.body.uid;
  cors(req, res, () => {
    // ADD up the number of created activities
    query.child("users/" + uid).once("value", snapshot => {
      let currentTimesUsed = snapshot.val().timesUsed +=1;
      if(currentTimesUsed < 2) {
        query.child("activities/unmatched/" + activity.id).set(activity);
        firebase.database().ref("users/" + uid).update({
          timesUsed: currentTimesUsed
        })
        .then(() => {
          query.child("users/" + uid + "/activities/unmatched/" + activity.id).set({activity});
          query.child("activities").once("value", snapshot => {
            res.send({
              "code": 200,
              "data": {activity: activity, allActivities: snapshot.val()}
            });
          });
        })
        .catch( e => {
          console.log("Adding up activities caused an error!", e);
        });
      } else {
        res.send({
          "code": 400,
          "data": "You have used all your free activities. Please proceed to the payments page"
        });
      }
    });
  })
});

exports.joinActivity = functions.https.onRequest( (req, res) => {
  cors( req, res, () => {
    let activity = req.body.activity,
    user = req.body.user,
    key = req.body.activity.key;
    
    query.child("activities/unmatched/" + key).once("value", snapshot => {
      if(activity.members.length === parseInt(snapshot.val().group)) { //Remove the unmatched ref once the group is full
        query.child("activities/unmatched/" + key).remove();
      } else {
        query.child("activities/unmatched/" + key + "/members").push(user);
        query.child("users/" + user.uid + "/activities/matched").push({activity, key});
      }
    });
    
    query.child("activities/matched/" + key).set(activity);
    query.child("activities").once("value", snapshot => {
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
        query.child("activities/unmatched/" + key).remove();
        query.child("activities").once("value", snapshot => {
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
        query.child("activities/matched/" + key).remove();
        query.child("chatRooms/" + key).remove();
        query.child("activities").once("value", snapshot => {
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
  var uid = req.body.uid;
  
  cors( req, res, () => {
    query.child("users/" + uid).once("value", snapshot => {
      if(snapshot.val() && snapshot.val().activities){
        res.send({
          "code": 200,
          "data": snapshot.val().activities
        })
      } else {
        res.send({
          "code": 204,
          "data": "No existing groups"
        })
      }
    })
    .catch( e => {
      console.log(e);
       res.send({
        "code": 500,
        "data": "Error in retrieving existing groups..."
      })
    })
  })
});

/* ==========CHAT FUNCTIONS=============*/
exports.openChatRoom = functions.https.onRequest((req,res) => {
  let info = req.body.info;

  cors( req, res, () => {
    query.child("chatRooms/" + req.body.info.key)
    .once("value")
    .then( snapshot => {
      if( !snapshot.val()) {
        query.child("chatRooms/" + req.body.info.key).set(info);
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

    query.child(`chatRooms/${roomId}`).once("value")
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
    
    query.child(`chatRooms/${roomId}/messages`).push({message, email, name});
    query.child(`chatRooms/${roomId}`).once("value")
    .then( snapshot => {
      res.send({
        "messages":snapshot.val().messages
      });
    });
  })
});