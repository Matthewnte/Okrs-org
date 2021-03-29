const GroupController = require('../controllers/group');
const { isAuthenticated } = require('../middleware/auth');
// const { uploadSingle } = require('../middleware/multer');

/**
 * @name groupRoute
 * @param {Object} groupRoutes Express Router Object
 * @returns {Null} Null
 */
const groupRoute = (groupRoutes) => {
  groupRoutes
    .route('/groups')
    .get(isAuthenticated, GroupController.getAllGroups)
    .post(isAuthenticated, GroupController.createGroup);
  groupRoutes
    .route('/groups/:groupId')
    .get(isAuthenticated, GroupController.getOneGroup)
    .patch(isAuthenticated, GroupController.updateGroup)
    .delete(isAuthenticated, GroupController.deleteGroup);
  groupRoutes
    .route('/groups/:groupId/members')
    .patch(isAuthenticated, GroupController.addMembers)
    .delete(isAuthenticated, GroupController.deleteMembers);
};

module.exports = groupRoute;
