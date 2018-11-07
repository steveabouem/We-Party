const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
var axios = require('axios');
var tokens = require('./functionSecrets');
const CircularJSON = require('circular-json');

exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log("Hello World");
});

exports.searchActivities = functions.https.onRequest( (request, response, search) => {
  // fix for circular errror: see https://github.com/axios/axios/issues/836
  // axios.get(url, config).then((response)=>{
  //   res.send(json);
  // }).catch((error)=>{
  //   console.log(error);
  // });
  cors(request, response, () => {
    axios.get("https://api.yelp.com/v3/businesses/search", {headers: { Authorization: `bearer ${tokens.yelpKey}`}, params: {
    term: search, location: "montreal"}})
    .then(r => {
      let json = CircularJSON.stringify(r);
      console.log("Cloud yelp resp", json);
      response.send(json);
    })
    .catch(e => {
      console.log( "Cloud yelp error: ", e);
      response.sendStatus(500); 
    })
  })
})

exports.saveActivities = functions.https.onRequest((req, res)=> {
  
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