const express = require('express');

// const userRoute = require('./user');
const authRoute = require('./auth');

const BaseRoutes = express.Router();

// userRoute(BaseRoutes);
authRoute(BaseRoutes);

module.exports = BaseRoutes;
