const { DataTypes } = require("sequelize");

// Exportamos una función que define el modelo "Organization"
module.exports = (sequelize) => {
  sequelize.define(
    "Organization",
    {
      // Identificador único de la organización, autoincremental
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
// Nombre de la organización
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El nombre debe ser string"); //!
            }
          },
          len: [5, 50], // Longitud permitida entre 5 y 50 caracteres
        },
      },
     
    },
    { timestamps: false } // Evita la creación automática de campos createdAt y updatedAt
  );
};
