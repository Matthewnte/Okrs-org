/* eslint-disable no-return-assign */
/* eslint-disable eqeqeq */
const KeyResult = require('../database/models/keyResult');
const FactoryService = require('./factory');

const CommentService = {
  createComment: async (keyResultId, data) => {
    const keyResult = await FactoryService.getOne(KeyResult, keyResultId);
    keyResult.comments.push(data);
    await keyResult.save();
    return keyResult;
  },

  getAllComments: async (keyResultId) => {
    const keyResult = await FactoryService.getOne(KeyResult, keyResultId);
    return keyResult.comments;
  },

  getOneComment: async (keyResultId, commentId) => {
    const keyResult = await FactoryService.getOne(KeyResult, keyResultId);
    const singleComment = keyResult.comments.find((comment) => comment._id == commentId);
    return singleComment;
  },

  updateComment: async (keyResultId, commentId, data) => {
    const keyResult = await FactoryService.getOne(KeyResult, keyResultId);
    keyResult.comments.forEach((comment) => {
      if (comment._id == commentId) {
        return (comment.comment = data.comment);
      }
      return comment;
    });
    await keyResult.save();
    return keyResult.comments.find((comment) => comment._id == commentId);
  },

  deleteComment: async (keyResultId, commentId) => {
    const keyResult = await FactoryService.getOne(KeyResult, keyResultId);
    const comments = keyResult.comments.filter((comment) => comment._id != commentId);
    keyResult.comments = comments;
    await keyResult.save();
    return comments;
  },
};

module.exports = CommentService;
