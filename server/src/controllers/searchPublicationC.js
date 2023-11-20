const { Publication } = require("../db.js");
const { Op } = require("sequelize");

const controllerBusqueda = async (busqueda) => {
  const publication = await Publication.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.substring]: busqueda,
          },
        },
        {
          description: {
            [Op.substring]: busqueda,
          },
        },
      ],
    },
    // limit: 1,
  });

  return publication;
};

module.exports = { controllerBusqueda };
