const {PutPublication} = require("../../controllers/Publication/PutPublication");

// Controlador para manejar la actualización de una publicación

const PutPublicationHandler = async (req, res) => {
    // Obtener el ID de la publicación de los parámetros de la solicitud

  const { id } = req.params;
    // Obtener los datos actualizados de la publicación del cuerpo de la solicitud

  const {
    title,
    description,
    category,
    startDate,
    endDate,
    modificationDate,
    creationDate,
    status,
    organization,
    url,
    image,
    registrationLink,
    contact,
  } = req.body;
  try {
        // Llamar a la función de controlador que realiza la actualización de la publicación

    const putPublication = await PutPublication(id, {
      title,
      description,
      category,
      startDate,
      endDate,
      modificationDate,
      creationDate,
      status,
      organization,
      url,
      image,
      registrationLink,
      contact,
    });
        // Verificar si la actualización fue exitosa

    if (!putPublication)
      return res
        .status(401)
        .json({ msg: "No se ha podido actualizar el post" });
            // Enviar una respuesta con el estado 200 (éxito) y los datos de la publicación actualizada

    return res.status(200).json(putPublication);
  } catch (error) {
        // En caso de error, enviar una respuesta de error al cliente con el estado 401 y el mensaje de error

    res.status(401).json({ error: error.message });
  }
};
module.exports = { PutPublicationHandler };
