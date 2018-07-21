const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/home', (req, res) => console.log("response server side", res));
app.listen(3001, () => console.log('Listening on port 3001!'));