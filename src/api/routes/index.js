const express = require('express');

const userRoute = require('./user');
const authRoute = require('./auth');
const objectiveRoute = require('./objective');
const groupRoute = require('./group');
const companyRoute = require('./company');
const timeFrameRoute = require('./timeFrame');

const BaseRoutes = express.Router();

userRoute(BaseRoutes);
authRoute(BaseRoutes);
objectiveRoute(BaseRoutes);
groupRoute(BaseRoutes);
companyRoute(BaseRoutes);
timeFrameRoute(BaseRoutes);

module.exports = BaseRoutes;
