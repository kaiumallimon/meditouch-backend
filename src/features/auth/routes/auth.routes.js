// imports
const express = require('express');
const authController = require('../controllers/auth.controller');   
const router = express.Router();


// define the routes
router.post('/register', authController.register);  
router.post('/login', authController.login);
router.get('/users', authController.getUsers);


// export the router
module.exports = router;