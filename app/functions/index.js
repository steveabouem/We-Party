const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
var axios = require('axios');
var tokens = require('./functionSecrets');


exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log("Hello World");
});

exports.searchActivities = functions.https.onRequest( (request, response) => {
  cors(request, response, () => {
    axios.get("https://api.yelp.com/v3/businesses/search", {headers:{ Authorization: `bearer ${tokens.yelpKey}`}})
    .then(r => {
      // console.log("Cloud yelp resp", r);
    })
    .catch( e => {
      // console.log( "Cloud yelp error: ", e);
    })
  })

})

exports.saveActivities = functions.https.onRequest((req, res)=> {
  // https://us-central1-we-party-210101.cloudfunctions.net/findMatches
  
  cors(req, res, () => {
    res.send("Start migrating functions")
  })
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