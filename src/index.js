// Required imports
const express = require('express');
const http = require('http'); // Import HTTP to work with Socket.IO
const app = require('./server');
const testRoute = require('./features/test/routes/test.route');

const session = require('express-session');
const connectDB = require('./config/database.config');

// Import routes
const authRoutes = require('./features/auth/routes/auth.routes');
const doctorAuthRoutes = require('./features/auth/routes/doctor.auth.routes');
const healthtipsRoutes = require('./features/healthtips/routes/healthtips.routes');
const communityFeatureRoutes = require('./features/community/routes/community.routes');
const apikeyRoutes = require('./features/apikey/routes/apikey.route');
const cartRoutes = require('./features/cart/routes/cart.route');
const ordersRoutes = require('./features/orders/routes/orders.route');

// Import socket config
const { initializeSocket } = require('./config/socket.config');

// Configure dotenv
require('dotenv').config();

// Get port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/test', testRoute);

// Use session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to the database
connectDB();

// Serve static files
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/core/security/apikey', apikeyRoutes);
app.use('/auth', authRoutes);
app.use('/auth/doctor', doctorAuthRoutes);
app.use('/healthtips', healthtipsRoutes);
app.use('/community', communityFeatureRoutes);
app.use('/cart', cartRoutes);
app.use('/epharmacy/orders',ordersRoutes);


// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
initializeSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
