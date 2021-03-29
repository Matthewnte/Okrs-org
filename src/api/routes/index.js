const express = require('express');

const userRoute = require('./user');
const authRoute = require('./auth');
const objectiveRoute = require('./objective');
const groupRoute = require('./group');

const BaseRoutes = express.Router();

userRoute(BaseRoutes);
authRoute(BaseRoutes);
objectiveRoute(BaseRoutes);
groupRoute(BaseRoutes);

module.exports = BaseRoutes;
