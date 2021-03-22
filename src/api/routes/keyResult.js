const KeyResultController = require('../controllers/keyResult');
const { isAuthenticated } = require('../middleware/auth');
// const { uploadSingle } = require('../middleware/multer');

/**
 * @name keyResultRoute
 * @param {Object} keyResultRoutes Express Router Object
 * @returns {Null} Null
 */
const keyResultRoute = (keyResultRoutes) => {
  keyResultRoutes
    .route('/keyResults')
    .get(isAuthenticated, KeyResultController.getAllKeyResults)
    .post(isAuthenticated, KeyResultController.createKeyResult);
  keyResultRoutes
    .route('/keyResults/:keyResultId')
    .get(isAuthenticated, KeyResultController.getOneKeyResult)
    .patch(isAuthenticated, KeyResultController.updateKeyResult)
    .delete(isAuthenticated, KeyResultController.deleteKeyResult);
};

module.exports = keyResultRoute;
