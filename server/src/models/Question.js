const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo "Question"
module.exports = (sequelize) => {
  sequelize.define(
    "Question",
    {
       // Identificador único de la pregunta, autoincremental
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      // Titulo de la pregunta 
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El titulo debe contener texto válido"); //!
            }
          },
          len: [5, 200],
        },
      },
      // Texto de la pregunta
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [20, 1000], // Longitud permitida entre 5 y 200 caracteres
        },
      },
      // ID del usuario que realiza la pregunta 
      userId: {
        // toma id del usuario que realiza la pregunta
        type: DataTypes.UUID,
        allowNull: false,
        field: "UserId", //Nombre del campo de la base de datos
      },
      // ID de la categoria a la que pertenece la pregunta
      categoryId: {
        // toma el id de la categoria
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
    }
  );
};
