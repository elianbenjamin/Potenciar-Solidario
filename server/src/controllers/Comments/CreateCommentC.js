const { Comment } = require("../../db");

const CreateComment = async ({thread, userId, answerId, questionId}) => {
  const newComment = await Comment.create({thread, userId, answerId});
  if (!newComment) throw new Error("No se pudo crear el comentario.");
  
 
  global.io.emit(`question_${questionId}`,newComment)
  
  return newComment;

};
module.exports = {CreateComment};
