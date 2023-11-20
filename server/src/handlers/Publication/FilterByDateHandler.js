const { Publication } = require("../../db.js");
const { Op } = require("sequelize");

// Controlador para filtrar publicaciones por fecha de creación
const FilterByDate = async (req, res) => {
     // Obtener las fechas de inicio y fin del cuerpo de la solicitud
    const { initialDate, finalDate } = req.body;
  

    try {
        // Consultar la base de datos para obtener las publicaciones dentro del rango de fechas
        const data = await Publication.findAll({
            where: {
                creationDate: {
                    [Op.between]: [initialDate, finalDate],
                },
            },
        });
         // Enviar una respuesta con el estado 200 (éxito) y los datos de las publicaciones filtradas

        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        // Podrías considerar enviar una respuesta de error al cliente con el estado 500 si se produce un error interno del servidor
    }
};
// Exportar el controlador para su uso en otras partes de la aplicación
module.exports = { FilterByDate };
