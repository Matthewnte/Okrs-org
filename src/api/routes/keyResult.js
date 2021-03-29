const express = require('express');
const KeyResultController = require('../controllers/keyResult');
const commentRoute = require('./comment');
const { isAuthenticated, restrictTo } = require('../middleware/auth');

const keyResultRouter = express.Router({ mergeParams: true });

keyResultRouter.use('/:keyResultId/comments', commentRoute);
keyResultRouter
  .route('/')
  .get(isAuthenticated, KeyResultController.getAllKeyResults)
  .post(isAuthenticated, restrictTo('admin', 'lead'), KeyResultController.createKeyResult);
keyResultRouter
  .route('/:keyResultId')
  .get(isAuthenticated, KeyResultController.getOneKeyResult)
  .patch(isAuthenticated, restrictTo('admin', 'lead'), KeyResultController.updateKeyResult)
  .delete(isAuthenticated, restrictTo('admin', 'lead'), KeyResultController.deleteKeyResult);

module.exports = keyResultRouter;
