const {
  ControllerGetQuestion,
} = require("../../controllers/Question/ControllerGetQuestion");

const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const getIdQuestion = await ControllerGetQuestion(id);
      if (getIdQuestion.length === 0)
        throw new Error("No existe pregunta con ese Id");

      return res.status(200).json(getIdQuestion);
    }
    const getAllQuestions = await ControllerGetQuestion();

    return res.status(200).json(getAllQuestions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getQuestion };
