const functions = require('firebase-functions');
const env = functions.config();
const cors = require('cors')({origin: true});
const firebase = require("firebase");
var axios = require('axios');
const yelpKey = env.yelp.key;
const dbConfig = {
  apiKey: env.fb.key,
  authDomain: "we-party-210101.firebaseapp.com",
  databaseURL: "https://we-party-210101.firebaseio.com",
  projectId: "we-party-210101",
  storageBucket: "we-party-210101.appspot.com",
  // messagingSenderId: tokens.firebaseSender
};
const stripe = require("stripe")(env.stripe.key);
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
          query.child("users/" + uid + "/activities/unmatched/" + activity.id).set(activity);
          res.send({
            "code": 200,
            "data": {activity: activity}
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
    let group = req.body.group,
    user = req.body.user,
    uid = req.body.user.uid,
    groupId = req.body.group.id,
    activitiesList = {matched: [], unmatched: []};
    
    query.child("activities/unmatched/" + groupId).once("value", snapshot => {
      if(group.members.length === parseInt(snapshot.val().group)) {
        query.child("activities/unmatched/" + groupId).remove();
        query.child("users/" + uid + "/activities/unmatched/" + groupId).remove();
      } else {
        query.child("activities/unmatched/" + groupId + "/members").update({member: group.members});
        query.child("users/" + uid + "/activities/matched/" + groupId).set(group);
      }
    })
    .then( () => {
      query.child("activities/matched/" + groupId).once("value", snapshot => {
        if(snapshot.val()) {
          query.child("activities/matched/" + groupId + "/members").set(group.members);
        }
      });
    })
    .then( () => {
      query.child("users/" + uid + "/activities").once("value", snapshot => {
        if(snapshot.val() && snapshot.val().unmatched){
          Object.keys(snapshot.val().unmatched).forEach( key => {
            activitiesList.unmatched.push(snapshot.val().unmatched[key]);
          });
        }

        if(snapshot.val() && snapshot.val().matched){
          Object.keys(snapshot.val().matched).forEach( key => {
            activitiesList.matched.push(snapshot.val().matched[key]);
          });
        }
        res.send({
          "code": 200,
          "data": activitiesList
        });
      });
    })
    .catch( e => {
      res.send({"code": 500, "data": e});
    })
  });
});

exports.deleteActivity = functions.https.onRequest( (req, res) => {
  cors( req, res, ()=> {
    let key = req.body.key,
    uid = req.body.uid || null,
    isMatched = req.body.isMatched,
    activitiesList = {matched: [], unmatched: []};
    
    switch (isMatched) {
      case "no":
        query.child("activities/unmatched/" + key).remove();
        query.child("activities").once("value", snapshot => {
          if(snapshot.val() && snapshot.val().unmatched){
            Object.keys(snapshot.val().unmatched).forEach( key => {
              activitiesList.unmatched.push(snapshot.val().unmatched[key]);
            });
          }

          if(snapshot.val() && snapshot.val().matched){
            Object.keys(snapshot.val().matched).forEach( key => {
              activitiesList.matched.push(snapshot.val().matched[key]);
            });
          }

          res.send({
            "code": 200,
            "data": activitiesList
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
        query.child("users/" + uid + "/activities/" + key).remove();
        query.child("user/" + uid + "/activities").once("value", snapshot => {
          if(snapshot.val() && snapshot.val().matched){
            Object.keys(snapshot.val().matched).forEach( key => {
              activitiesList.matched.push(snapshot.val().matched[key])
            });
          }
          if(snapshot.val()&& snapshot.val().unmatched){
            Object.keys(snapshot.val().unmatched).forEach( key => {
              activitiesList.unmatched.push(snapshot.val().unmatched[key])
            });
          }
          res.send({
            "code": 200,
            "data": activitiesList
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
  const uid = req.body.uid;
  let activitiesList = {matched: [], unmatched: []};
  
  cors( req, res, () => {
    query.child("users/" + uid).once("value", snapshot => {
      if(snapshot.val() && snapshot.val().activities){
        if(snapshot.val().activities.unmatched) {
          Object.keys(snapshot.val().activities.unmatched).forEach( key => {
            activitiesList.unmatched.push(snapshot.val().activities.unmatched[key]);
          });
        }
        if(snapshot.val().activities.matched) {
          Object.keys(snapshot.val().activities.matched).forEach( key => {
            activitiesList.matched.push(snapshot.val().activities.matched[key]);
          });
        }
        res.send({
          "code": 200,
          "data": activitiesList
        });
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

exports.sendFeedback = functions.https.onRequest((req,res) => {
  let feedback = req.body.feedback,
  uid = req.body.uid;
  
  cors(req, res, () => {
    console.log("body", req.body, feedback, uid);
    query.child("surveys/" + uid).set(feedback)
    .then( r => {
      res.send({data: r});
    })
    .catch( e => {
      console.log(e);
      res.send({code: 500, data: e});
    });
  });
});