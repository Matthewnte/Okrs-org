const express = require('express');
const CommentController = require('../controllers/comment');
const { isAuthenticated } = require('../middleware/auth');

const commentRouter = express.Router({ mergeParams: true });

commentRouter
  .route('/')
  .get(isAuthenticated, CommentController.getAllComments)
  .post(isAuthenticated, CommentController.createComment);
commentRouter
  .route('/:commentId')
  .get(isAuthenticated, CommentController.getOneComment)
  .patch(isAuthenticated, CommentController.updateComment)
  .delete(isAuthenticated, CommentController.deleteComment);

module.exports = commentRouter;
