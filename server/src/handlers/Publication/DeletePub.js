const {DeletePubCont }= require("../../controllers/Publication/DeletePublication.js");

//DOMpurify for DOM sanitization
// Controlador para eliminar una publicación
const deletePublication = async (req, res) => {
  const { id } = req.params;
  try {
      // Llamar al controlador correspondiente para eliminar la publicación
    const deletedRows = await DeletePubCont(id);
    // Verificar si se eliminaron filas (la publicación existía)
    if (deletedRows !== 0) {
      res.status(200).json({
        message: "La publicación fue borrada exitosamente",
      });
    } else {
      // Enviar una respuesta con el estado 404 (no encontrado) si la publicación no existe
      res.status(404).json({
        message: "Publicacion no encontrada",
      });
    }
  } catch (error) {
    // En caso de error, enviar una respuesta con el estado 500 (error interno del servidor) y un mensaje de error
    console.error(error);
    res.status(500).json({
      message: "Ocurrió un error al intentar borrar la publicación",
    });
  }
};

module.exports = {
  deletePublication,
};
