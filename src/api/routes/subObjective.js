const express = require('express');
const ObjectiveController = require('../controllers/objective');
const keyResultRoute = require('./keyResult');
const { isAuthenticated, restrictTo } = require('../middleware/auth');

const objectiveRouter = express.Router({ mergeParams: true });

objectiveRouter.use('/objectives/:objectiveId/keyResults', keyResultRoute);
objectiveRouter
  .route('/')
  .get(isAuthenticated, ObjectiveController.getAllObjectives)
  .post(isAuthenticated, restrictTo('admin', 'lead'), ObjectiveController.createObjective);
objectiveRouter
  .route('/:subObjectiveId')
  .get(isAuthenticated, ObjectiveController.getOneObjective)
  .patch(isAuthenticated, restrictTo('admin', 'lead'), ObjectiveController.updateObjective)
  .delete(isAuthenticated, restrictTo('admin', 'lead'), ObjectiveController.deleteObjective);

module.exports = objectiveRouter;
