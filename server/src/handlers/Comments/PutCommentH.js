const {UpdateComment} = require("../../controllers/Comments/PutCommentC")

// Controlador para manejar la actualización de comentarios
const UpdateCommentHandler = async (req, res) => {
    try {
      // Obtener el ID del comentario de los parámetros de la solicitud
      const { id } = req.params;
      // Obtener el nuevo hilo (thread) del cuerpo de la solicitud
      const { thread } = req.body;
       // Utilizar la función del controlador correspondiente para actualizar el comentario
      const updateComment = await UpdateComment(id,  {thread });

// Verificar si el comentario se actualizó correctamente
      if (!updateComment) {
        return res
          .status(404)
          .json({ msg: "No se ha podido actualizar el comment" });
      }
     // Enviar una respuesta con el estado 200 (éxito) y los detalles del comentario actualizado
      return res.status(200).json(updateComment);
    } catch (error) {
       // En caso de error, enviar una respuesta con el estado 500 (error interno del servidor) y detalles del error
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = { UpdateCommentHandler };