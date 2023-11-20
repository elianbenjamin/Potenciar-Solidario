const { Category } = require("../../db");

const controllerCategories = async () => {
  const allCategories = await Category.findAll();

  return allCategories;
};

module.exports = { controllerCategories };
