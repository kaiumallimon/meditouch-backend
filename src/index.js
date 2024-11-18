//import express
const express = require('express');

//import the app from server.js
const app = require('./server');

// import the test route
const testRoute = require('./features/test/routes/test.route'); 


// configure dotenv
require('dotenv').config(); 

// get port
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

// use the test route
app.use('/test',testRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

