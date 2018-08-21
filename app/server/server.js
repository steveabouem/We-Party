const express = require('express');
const os = require('os');
const app = express();
const axios = require('axios');

app.use(express.static('dist'));
app.get('/home:query', (req, res) => {
  const params = req.params.query;
  const search = params.split("").slice(1, params.length).join("");
  console.log("search: ", search)
  const yelpConfig = {
    headers: { Authorization: "Bearer woO7hOWfngBu9aeNH8cMaN0g4p7_u0IzDZ5JFvjwhu0aqAItRM-5HijZhO3JY_TwmEVq3kFpnh0Ss5yBBHYYFTZPeCtuXStFKtdmO93SILH3b-RNgeyvOisyIWpNW3Yx" },
    params: {
      name: `${search}`,
      location: "Montreal"
    }
  };
  if(params.length > 3)
  axios
  .get(`https://api.yelp.com/v3/categories/${search}`, yelpConfig)
  .then(response => {
    console.log("food done: ", response.data);
  })
  .catch(err => console.log("error: ", err));
});

app.get('/activities', (req, res) => console.log("activities", Object.keys(res)));



app.listen(3001, () => console.log('Listening on port 3001!'));