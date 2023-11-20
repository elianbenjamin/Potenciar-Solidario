const { controllerGetUsers } = require("../../controllers/User/ControllerGetUsers");

const handlerGetUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const ID = isNaN(id);

    if (id) {
      const userId = await controllerGetUsers(id, ID);
      if (!userId) {
        return res
          .status(404)
          .json({ error: "No se encontró un usuario con ese ID" });
      }

      return res.status(200).json(userId);
    }

    const allUsers = await controllerGetUsers();

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { handlerGetUsers };
