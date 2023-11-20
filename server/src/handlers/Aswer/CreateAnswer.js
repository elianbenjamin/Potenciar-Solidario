const { CreateAnswer } = require("../../controllers/Aswer/CreateAnswer");

// Controlador para manejar la creación de respuestas a preguntas
const createAnswerHandler = async (req, res) => {
  // Extraer datos necesarios del cuerpo de la solicitud
  const { answer, userId, questionId } = req.body;
try {
  // Verificar que la respuesta, el ID del usuario y el ID de la pregunta estén presentes
  if (!answer || !userId || !questionId) {
    throw new Error("La answer, userId y questionId son obligatorios");
  }
  // Crear la respuesta utilizando la función del controlador correspondiente
  const Answer = await CreateAnswer({ answer, userId, questionId });

  // Emitir un evento de WebSocket indicando que se ha respondido a la pregunta
  global.io.emit(`question_${questionId}`);

   // Enviar una respuesta con el estado 201 (creado) y los detalles de la respuesta creada
  res.status(201).json(Answer);
} catch (error) {
   // En caso de error, enviar una respuesta con el estado 400 (bad request) y detalles del error
  console.log(error)
  res.status(400).json({ error: error.message });
}

};

// Exportar el controlador para su uso en otras partes de la aplicación
module.exports = { createAnswerHandler };
