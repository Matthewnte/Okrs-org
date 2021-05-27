const express = require('express');

const userRoute = require('./user');
const authRoute = require('./auth');
const objectiveRoute = require('./objective');
const groupRoute = require('./group');
const companyRoute = require('./company');
const timeFrameRoute = require('./timeFrame');
const notificationRoute = require('./notification');

const BaseRoutes = express.Router();

userRoute(BaseRoutes);
authRoute(BaseRoutes);
objectiveRoute(BaseRoutes);
groupRoute(BaseRoutes);
companyRoute(BaseRoutes);
timeFrameRoute(BaseRoutes);
notificationRoute(BaseRoutes);

module.exports = BaseRoutes;
