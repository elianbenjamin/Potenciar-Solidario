const { controllerCategories } = require("../../controllers/Category/getAllCategoriesC");

// En esta funcion es para obtener y hacer una de todas las categorias.
const getAllCategories = async (req, res) => {
  try {
    // Se llama al controlador que se encarga de llamar a la base de datos y traer los registros correspondientes 
    // Se ejecuta la función del controlador que se encarga de obtener todos los registros de la tabla Categorías
    // Se ejecuta el controlador que se encarga de realizar la consulta a la base de datos.
    const allCategories = await controllerCategories();
    // verifica si hay categorias sino utilizamos un throw new Error y lo atrapa el catch
    if (allCategories.length === 0) throw new Error("No existen categorias");

    // Si todo sale bien se devuelve los resultados en formato json
    return res.status(200).json(allCategories);
  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { getAllCategories };
