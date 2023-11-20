const { Question } = require("../../db.js");

const createQuestionHandler = async (req, res) => {
  const { title, text, userId, categoryId } = req.body;
  try {
    if (!title || !text) {
      return res
        .status(400)
        .json({ error: "Faltan ingresar campos para la pregunta" });
    }
    const question = await Question.create({ title, text, userId, categoryId });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createQuestionHandler };
