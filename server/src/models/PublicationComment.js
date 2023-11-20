const { DataTypes } = require("sequelize");


// Exportamos una función que define el modelo "PublicationComment"
module.exports = (sequelize) => {
  sequelize.define(
    "PublicationComment",
    {
      // Identificador único del comentario de publicación
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        }
      },
      // ID del usuario que realiza el comentario
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      // ID de la publicación a la que pertenece el comentario
      publicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      // Contenido del comentario de la publicación
      comment: {
        type : DataTypes.TEXT,
        allowNull: false,
        }
        },
    { timestamps: true}
  );
  
};

//Los comentarios tienen una pequeña validacion de length y tienen que tener contenido
