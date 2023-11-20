const { User } = require("../../db");

const DeleteUser = async (id) => {
  const user = await User.destroy({ where: { id: id } });

  if (!user) {
    return { deletedRows: 0, message: "User not found" };
  }
  return { deletedRows: user, message: "User deleted successfully" };
};

module.exports = { DeleteUser };
