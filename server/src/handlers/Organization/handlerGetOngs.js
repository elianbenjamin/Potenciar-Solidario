const { controllerOngs } = require("../../controllers/Organization/ControllerGetOngs");

// Controlador para obtener ONGs filtradas por categoría
const handlerOngs = async (req, res) => {
  try {
     // Obtener el parámetro de consulta 'ongs' de la solicitud
    const { ongs } = req.query;
      // Utilizar la función del controlador correspondiente para obtener las ONGs filtradas por categoría
    const OngsFn = await controllerOngs(ongs);

    // Verificar si existen ONGs filtradas
    if (OngsFn.length === 0)
      throw new Error("No existen Publicaciones con la categoria seleccionada");
    // Enviar una respuesta con el estado 200 (éxito) y las ONGs obtenidas
    return res.status(200).json(OngsFn);
  } catch (error) {
     // En caso de error, enviar una respuesta con el estado 500 (error interno del servidor) y detalles del error
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerOngs };
