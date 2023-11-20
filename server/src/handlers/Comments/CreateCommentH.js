const {CreateComment} = require('../../controllers/Comments/CreateCommentC')

// Controlador para manejar la creación de comentarios
const CreateCommentHandler = async(req,res)=>{
  // Extraer datos necesarios del cuerpo de la solicitud
  const {thread, userId, answerId,questionId} = req.body

  try {
    // Crear un nuevo comentario utilizando la función del controlador correspondiente
    const newComment = await CreateComment({ thread, userId, answerId,questionId});

    // Emitir un evento de WebSocket indicando que se ha creado un nuevo comentario
    global.io.emit(`question_${questionId}`,newComment);

    // Enviar una respuesta con el estado 201 (creado) y los detalles del comentario creado
    res.status(201).json(newComment)

  
  } catch (error) {
    res.status(404).json({error:error.message})
  }
}

module.exports = { CreateCommentHandler };