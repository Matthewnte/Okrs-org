const ObjectiveController = require('../controllers/objective');
const { isAuthenticated, restrictTo } = require('../middleware/auth');
const keyResultRoute = require('./keyResult');
const subObjectiveRoute = require('./subObjective');

/**
 * @name objectiveRoute
 * @param {Object} objectiveRoutes Express Router Object
 * @returns {Null} Null
 */
const objectiveRoute = (objectiveRoutes) => {
  objectiveRoutes.use('/objectives/:objectiveId/keyResults', keyResultRoute);
  objectiveRoutes.use('/objectives/:objectiveId/sub-objectives', subObjectiveRoute);
  objectiveRoutes
    .route('/objectives')
    .get(isAuthenticated, ObjectiveController.getAllObjectives)
    .post(isAuthenticated, restrictTo('admin'), ObjectiveController.createObjective);
  objectiveRoutes
    .route('/objectives/:objectiveId')
    .get(isAuthenticated, ObjectiveController.getOneObjective)
    .patch(isAuthenticated, restrictTo('admin'), ObjectiveController.updateObjective)
    .delete(isAuthenticated, restrictTo('admin'), ObjectiveController.deleteObjective);
};

module.exports = objectiveRoute;
