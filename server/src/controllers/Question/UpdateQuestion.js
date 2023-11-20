const { Question } = require("../../db");

const UpdateQuestion = async (id, userData) => {
  try {
    let updateQ = await Question.findByPk(id);
    if (!updateQ) throw new Error("Question no encontrada.");

    // Actualiza las propiedades de updateQ con los valores de userData
    for (let key in userData) {
      updateQ[key] = userData[key];
    }

    await updateQ.save();
    
  } catch (error) {
    throw new Error("No se ha podido actualizar la pregunta.");
  }
};

module.exports = {
  UpdateQuestion,
};
