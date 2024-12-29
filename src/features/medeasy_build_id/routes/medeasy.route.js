// import express and medeasy controller and create a router
const express = require('express');
const router = express.Router();

const medeasyController = require('./../controllers/medeasy.controller');

// define the routes

router.get('/build/id', medeasyController.getBuildId);

module.exports = router;
