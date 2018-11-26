const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const CircularJSON = require('circular-json');
const firebase = require("firebase");
var axios = require('axios');
var tokens = require('./functionSecrets');


exports.retrieveCurrentUser = functions.https.onRequest((request, response) => {
  
})

exports.findMatches = functions.https.onRequest((req, res) => {
  const group = document.getElementById("how-many").value;
  const budget = document.getElementById("budget-selected").innerText;
  const genders = document.getElementById("gender-selected").innerText;
  const data = { group: group, genders: genders, budget: budget}
  const activitiesCollection = firebase.database().ref().child('activities');
  
  activitiesCollection.orderByKey().once('value').then( function(snapshot){
    console.log("match snapshot", snapshot.val());
  })
})