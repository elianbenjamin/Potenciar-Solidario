const { ForoCategories } = require('../../db');

const controllerForoCategories = async () => {
    
  const allCategories = await ForoCategories.findAll();

  return allCategories;
};

module.exports = {controllerForoCategories };