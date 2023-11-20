const { Organization } = require("../../db");

const controllerOngs = async () => {
  const allOngs = await Organization.findAll();

  return allOngs;
};

module.exports = { controllerOngs };
