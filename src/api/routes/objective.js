const ObjectiveController = require('../controllers/objective');
const { isAuthenticated } = require('../middleware/auth');
// const { uploadSingle } = require('../middleware/multer');

/**
 * @name objectiveRoute
 * @param {Object} objectiveRoutes Express Router Object
 * @returns {Null} Null
 */
const objectiveRoute = (objectiveRoutes) => {
  objectiveRoutes
    .route('/objectives')
    .get(isAuthenticated, ObjectiveController.getAllObjectives)
    .post(isAuthenticated, ObjectiveController.createObjective);
  objectiveRoutes
    .route('/objectives/:objectiveId')
    .get(isAuthenticated, ObjectiveController.getOneObjective)
    .patch(isAuthenticated, ObjectiveController.updateObjective)
    .delete(isAuthenticated, ObjectiveController.deleteObjective);
};

module.exports = objectiveRoute;
