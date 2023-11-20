const { controllerOngs } = require("../../controllers/Organization/getAllOngsC");

// Controlador para obtener todas las ONGs
const handlerAllOngs = async (req, res) => {
  try {
    // Utilizar la función del controlador correspondiente para obtener todas las ONGs
    const allOngs = await controllerOngs();
    // Verificar si existen ONGs
    if (allOngs.length === 0) throw new Error("No existen ONGs");
// Enviar una respuesta con el estado 200 (éxito) y las ONGs obtenidas
    return res.status(200).json(allOngs);
  } catch (error) {
    // En caso de error, enviar una respuesta con el estado 500 (error interno del servidor) y detalles del error
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerAllOngs };
