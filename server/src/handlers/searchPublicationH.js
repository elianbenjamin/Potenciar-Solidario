const { controllerBusqueda } = require("../controllers/searchPublicationC");

const searchPublication = async (req, res) => {
  try {
    const { busqueda } = req.query;
    if (busqueda && typeof busqueda === "string") {
      const palabraBusqueda = await controllerBusqueda(busqueda.trim());
      if (palabraBusqueda.length === 0)
        throw new Error("La palabra clave de búsqueda es inválida");

      return res.status(200).json(palabraBusqueda);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { searchPublication };
