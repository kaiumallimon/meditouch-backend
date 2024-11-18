// Imports
const express = require('express');
const bodyParser = require('body-parser');

//import cors
const cors = require('cors')

// create express app
const app = express();

app.use(cors())
app.use(bodyParser.json());


//export the app
module.exports = app;