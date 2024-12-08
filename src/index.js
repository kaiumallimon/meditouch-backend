//imports
const express = require('express');
const app = require('./server');
const testRoute = require('./features/test/routes/test.route'); 

const session = require('express-session');
const connectDB = require('./config/database.config');

// All the routes
const authRoutes = require('./features/auth/routes/auth.routes');   
const doctorAuthRoutes = require('./features/auth/routes/doctor.auth.routes');
const healthtipsRoutes = require('./features/healthtips/routes/healthtips.routes');    
const communityFeatureRoutes = require('./features/community/routes/community.routes');
const apikeyRoutes = require('./features/apikey/routes/apikey.route');
const cartRoutes = require('./features/cart/routes/cart.route');
const doctor = require('./features/telemedicine/routes/doctor.routes');



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




// connect to the database
connectDB();

// serve static files

app.use('/uploads', express.static('uploads'));


// use the api key route

app.use('/core/security/apikey',apikeyRoutes);

// use the auth routes
app.use('/auth',authRoutes);


// use the doctor auth route

app.use('/auth/doctor',doctorAuthRoutes);

// use the telemedicine route

app.use('/telemedicine',doctor);


// use the healthtips route
app.use('/healthtips',healthtipsRoutes);


// use the comm. feature route

app.use('/community',communityFeatureRoutes);


// use the cart route
app.use('/cart',cartRoutes);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

