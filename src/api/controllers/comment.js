const catchAsyncError = require('../../helpers/catchAsyncError');
const CommentService = require('../../services/comment');

const CommentController = {
  createComment: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;

    const keyResult = await CommentService.createComment(keyResultId, {
      ...request.body,
      user: request.user.id,
    });

    return response.status(201).json({
      status: 'successful',
      data: { comment: keyResult },
    });
  }),

  getAllComments: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;

    const comments = await CommentService.getAllComments(keyResultId);

    return response.status(200).json({
      status: 'success',
      result: comments.length,
      data: { comments },
    });
  }),

  getOneComment: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;
    const { commentId } = request.params;

    const comment = await CommentService.getOneComment(keyResultId, commentId);

    return response.status(200).json({
      status: 'success',
      data: { comment },
    });
  }),

  updateComment: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;
    const { commentId } = request.params;

    const comment = await CommentService.updateComment(keyResultId, commentId, request.body);

    return response.status(200).json({
      status: 'success',
      data: { comment },
    });
  }),

  deleteComment: catchAsyncError(async (request, response) => {
    const { keyResultId } = request.params;
    const { commentId } = request.params;

    const comment = await CommentService.deleteComment(keyResultId, commentId);

    return response.status(200).json({
      status: 'success',
      data: comment,
    });
  }),
};

module.exports = CommentController;
