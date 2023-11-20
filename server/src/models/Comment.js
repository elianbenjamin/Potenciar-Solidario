const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comment",
    {
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
      thread: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "El texto no puede estar vacío",
          },
          len: {
            args: [5, 1000],
            msg: "Debe tener entre 10 y 300 caracteres",
          },
        },
      },
    },
    { timestamps: true }
  );
  
};

//Los comentarios tienen una pequeña validacion de length y tienen que tener contenido
