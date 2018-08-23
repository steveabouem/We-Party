const express = require('express');
const os = require('os');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const yelpKey = require('../src/utils/serverSecrets')

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/home:query', async (req, res) => {
  var topResults = [];
  const params = req.params.query;
  const search = params.split("").slice(1, params.length).join("");
  const yelpConfig = {
    headers: { Authorization: `Bearer ${yelpKey}` },
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
          for( let i =0; i < 4; i ++ ){
            if(results[i].name)
            topResults.push(results[i]);
          }
        }
      })
      .catch(err => console.log("error: ", err));
    }
    res.send({'results': topResults})
});

// app.get('/activities', (req, res) => console.log("activities", Object.keys(res)));

app.listen(3001, () => console.log('Listening on port 3001!'));