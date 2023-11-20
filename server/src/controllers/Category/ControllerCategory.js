const { Publication } = require("../../db.js");

const controllerCategory = async (category) => {
  const categoryOriginal = category.replace(/[-_]/g, " ");
  const publiCategory = await Publication.findAll({
    where: { category: categoryOriginal },
  });

  return publiCategory;
};

module.exports = { controllerCategory };
