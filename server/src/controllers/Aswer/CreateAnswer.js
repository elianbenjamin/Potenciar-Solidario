const { Answer } = require("../../db");

const CreateAnswer = async ({ answer, userId, questionId }) => {
  const newAnswer = await Answer.create({ answer, userId, questionId });
  if (!newAnswer) {
    throw new Error("No se pudo crear la answer");
  } 

  global.io.emit(`question_${questionId}`)

  return newAnswer;
};
module.exports = { CreateAnswer };
