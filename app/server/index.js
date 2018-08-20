const express = require('express');
const os = require('os');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/home:query', async (req, res) => {
  var topResults = [];
  const params = req.params.query;
  const search = params.split("").slice(1, params.length).join("");
  const yelpConfig = {
    headers: { Authorization: "Bearer woO7hOWfngBu9aeNH8cMaN0g4p7_u0IzDZ5JFvjwhu0aqAItRM-5HijZhO3JY_TwmEVq3kFpnh0Ss5yBBHYYFTZPeCtuXStFKtdmO93SILH3b-RNgeyvOisyIWpNW3Yx" },
    params: {
      term: search,
      location: "montreal"
    }
  };
  if(search.length > 4){
      await axios
      .get(`https://api.yelp.com/v3/businesses/search`, yelpConfig)
      .then(async response => {
        if(response.data.businesses){
          let results = response.data.businesses;
          console.log("search done: ", search);
          for( let i =0; i < 4; i ++ ){
            if(results[i].name)
            console.log('result:', results[i].name);
            topResults.push(results[i]);
          }
        }
      })
      .catch(err => console.log("error: ", err));
    }
    res.send({'results': topResults})
});

app.get('/activities', (req, res) => console.log("activities", Object.keys(res)));

app.listen(3001, () => console.log('Listening on port 3001!'));