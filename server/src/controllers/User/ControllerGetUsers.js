const { User, Publication } = require("../../db");

const controllerGetUsers = async (id, ID) => {
  if (ID) {
    const user = await User.findOne({
      where: { id: id },
      include: { model: Publication },
    });
    return user;
  }

  const allUsers = await User.findAll({
    include: { model: Publication },
  });
  return allUsers;
};

module.exports = { controllerGetUsers };
