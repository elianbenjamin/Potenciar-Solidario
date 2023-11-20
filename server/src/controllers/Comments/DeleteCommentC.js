const { Comment } = require('../../db');

const DeleteCommentC = async (userData) => {
  try {
    if (userData) {
      const deletedRows = await Comment.destroy({ where: { id: userData } });

      if (deletedRows === 0) {
        throw new Error("No hay comentarios de este usuario.");
      }

      return { deletedRows, message: "Comentario borrado exitosamente" };
    } else {
      throw new Error("User ID es requerido.");
    }
  } catch (error) {
    throw new Error("Error al borrar el comentario: " + error.message);
  }
};

module.exports = { DeleteCommentC };
