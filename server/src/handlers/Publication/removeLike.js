const {RemoveLike} = require("../../controllers/Publication/removeLike")

// Controlador para manejar la eliminación de un "me gusta" de una publicación

const HandlerRemoveLike = async (req, res) => {
    try {
              // Obtener el ID de la publicación desde el cuerpo de la solicitud

      const { idPublication } = req.body;
              // Obtener el ID del usuario desde la información de autenticación

      const userId = req.userId;
      
      
              // Verificar si se recibieron los parámetros necesarios

      if (!userId || !idPublication) {
          throw new Error("No se recibieron los parametros necesarios");
        }
  
   // Llamar a la función de controlador que realiza la eliminación del "me gusta"
        const like = await RemoveLike({idPublication, userId})
  
            // Enviar una respuesta con el estado 200 (éxito) y los datos relevantes

        return res.status(200).json({like, userId});
    } catch (error) {
              // En caso de error, enviar una respuesta de error al cliente con el estado 500 y el mensaje de error

      res.status(500).send(error.message);
    }
  };
  
module.exports = {HandlerRemoveLike};