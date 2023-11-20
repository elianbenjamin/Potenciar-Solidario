const { UpdateAnswer } = require("../../controllers/Aswer/UpdateAnswer");

// En este handlers se va a actualizar la respuesta, tambien esta es una funcion asincrona

const UpdateAnswerHandler = async (req, res) => {
  // utilizamos un manejador de errores try catch
  try {
    // destructuramos el ID por params ya que necesitamos el id de esa respuesta para poder actualizar
    const { id } = req.params;
    // aca destructurar la respuesta que viene por body la que el usuario va a actualizar.
    const { answer } = req.body;
    // llamada al controlador con los parametros correspondientes
    const updateAnswer = await UpdateAnswer(id, { answer });
    // si todo sale bien mandamos un mensaje y le damos como resultado el dato del usuario creado

    if (!updateAnswer) {
      return res
        .status(404)
        .json({ msg: "No se ha podido actualizar la answer" });
    }
    

    return res.status(200).json(updateAnswer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { UpdateAnswerHandler };
