const { controllerCategory } = require("../../controllers/Category/ControllerCategory");
// importar las rutas de la carpeta controllers/category


const handlerCategory = async (req, res) => {

  try {
    // llamada al controlador para obtener los registros de la tabla category

    const { category } = req.query;
    const categoryFn = await controllerCategory(category);
    if (categoryFn.length === 0)
      throw new Error("No existen Publicaciones con la categoria seleccionada");
    
    return res.status(200).json(categoryFn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerCategory };
