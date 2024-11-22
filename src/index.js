//imports
const express = require('express');
const app = require('./server');
const testRoute = require('./features/test/routes/test.route'); 
const passport = require('./config/passport.config');
const passport2 = require('./config/doctor.passport.config');

const session = require('express-session');
const connectDB = require('./config/database.config');
const authRoutes = require('./features/auth/routes/auth.routes');   
const path = require('path');
const doctorAuthRoutes = require('./features/auth/routes/doctor.auth.routes');
const healthtipsRoutes = require('./features/healthtips/routes/healthtips.routes');     

// configure dotenv
require('dotenv').config(); 

// get port
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

// use the test route
app.use('/test',testRoute);


// use session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


// use passport
app.use(passport.initialize());
app.use(passport.session());



//use passport for doctor

app.use(passport2.initialize());
app.use(passport2.session());


// connect to the database
connectDB();

// serve static files

app.use('/uploads', express.static('uploads'));

// use the auth routes
app.use('/auth',authRoutes);


// use the doctor auth route

app.use('/auth/doctor',doctorAuthRoutes);


// use the healthtips route
app.use('/healthtips',healthtipsRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

