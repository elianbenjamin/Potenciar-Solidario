const {PostLike} = require("../../controllers/Publication/PostLike");

// Controlador para manejar la creación de un "like" en una publicación

const HandlerPostLike = async (req, res) => {
  try {
        // Obtener los parámetros necesarios del cuerpo de la solicitud

    const { idPublication } = req.body;
    const userId = req.userId;
   
        // Verificar si se recibieron los parámetros necesarios
    if (!userId || !idPublication) {
        throw new Error("No se recibieron los parametros necesarios");
      }

          // Llamar a la función del controlador para crear el "like"

      const like = await PostLike({idPublication, userId})
      return res.status(200).json(like);
  } catch (error) {
       // En caso de error, imprimir el mensaje de error en la consola

    res.status(500).send(error.message);
  }
};

module.exports = {HandlerPostLike};
