const { controllerForoCategories } = require('../../controllers/ForoCategories/ControllerForoCat');

// Controlador para obtener todas las categorías del foro
const getForoCategories = async (req, res) => {
  try {
     // Utilizar la función del controlador correspondiente para obtener todas las categorías
    const allCategories = await controllerForoCategories();

    // Verificar si existen categorías
    if (allCategories.length === 0) throw new Error("No existen categorias");

    // Enviar una respuesta con el estado 200 (éxito) y las categorías obtenidas
    return res.status(200).json(allCategories);

  } catch (error) {
    // En caso de error, enviar una respuesta con el estado 500 (error interno del servidor) y detalles del error
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getForoCategories };