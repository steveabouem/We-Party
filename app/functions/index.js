var axios = require("axios");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
exports.saveActivities = functions.https.onCall((data)=> {
  const yelpConfig = {
    headers: { Authorization: "Bearer woO7hOWfngBu9aeNH8cMaN0g4p7_u0IzDZ5JFvjwhu0aqAItRM-5HijZhO3JY_TwmEVq3kFpnh0Ss5yBBHYYFTZPeCtuXStFKtdmO93SILH3b-RNgeyvOisyIWpNW3Yx", "Access-Control-Allow-Origin": "*" },
    params: {
      name: `${data}`,
      location: "Montreal"
    }
  };
  axios
  .get(`https://api.yelp.com/v3/categories/${data}`, yelpConfig)
  .then(response => {
    console.log("call done: ", response.data);
    return;
  })
  .catch(err => console.log("Yelp call error: ", err));
})