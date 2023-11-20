const { Publication } = require("../../db.js");

const controllerOngs = async (ongs) => {
  const ongsOriginal = ongs.replace(/[-_]/g, " ");
  const publications = await Publication.findAll({
    where: { organization: ongsOriginal },
  });

  return publications;
};

module.exports = { controllerOngs };
