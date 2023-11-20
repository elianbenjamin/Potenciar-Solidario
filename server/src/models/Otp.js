const { DataTypes } = require("sequelize");


// Exportamos una función que define el modelo "Otp" (One-Time Password)
module.exports = (sequelize) => {
  sequelize.define(
    "Otp",
    {
      // Identificador único del registro OTP, autoincremental
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
        },
      },
// Correo electrónico asociado al OTP
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
 // Token generado como parte del OTP
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
