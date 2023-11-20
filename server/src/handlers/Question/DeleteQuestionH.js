const { DeleteQuestion } = require("../../controllers/Question/DeleteQuestionC");

const DeleteQuestionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuestion = await DeleteQuestion(id);
    if (!deleteQuestion) {
      throw new Error("La pregunta no fue encontrada en la db");
    }
    res.status(200).json(deleteQuestion);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { DeleteQuestionHandler };
