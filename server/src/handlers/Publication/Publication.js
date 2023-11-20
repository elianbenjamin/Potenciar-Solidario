const {getPublications} = require("../../controllers/Publication/GetPublication");

// Controlador para manejar la obtención de publicaciones

const HandlerGetPublications = async (req, res) => {
  try {
        // Obtener el parámetro de ID de los parámetros de la solicitud

    const { id } = req.params;
        // Verificar si se proporcionó un ID específico

    if (id) {
  // Obtener una publicación específica por su ID
      const getOne = await getPublications(id);
// Verificar si la publicación específica existe
      if (getOne.length === 0) {
        throw new Error("No existe esa publicación");
      }
      // Enviar una respuesta con el estado 200 (éxito) y los datos de la publicación específica
      return res.status(200).json(getOne);
    } else {
      // Si no se proporcionó un ID, obtener todas las publicaciones
      const allPublications = await getPublications();
      // Enviar una respuesta con el estado 200 (éxito) y los datos de todas las publicaciones

      res.json(allPublications);
    }
  } catch (error) {
        // En caso de error, enviar una respuesta de error al cliente con el estado 500 y el mensaje de error

    res.status(500).send(error.message);
  }
};

module.exports = {HandlerGetPublications};
