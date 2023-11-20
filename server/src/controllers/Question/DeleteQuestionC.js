const { Question } = require("../../db");

const DeleteQuestion = async (id) => {
  const question = await Question.destroy({ where: { id: id } });
  if (!question) {
    return {
      deletedRows: question,
      message: "La pregunta no fue encontrada en la db",
    };
  }
  return question;
};

module.exports = { DeleteQuestion };
