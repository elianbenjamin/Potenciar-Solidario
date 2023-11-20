const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Like",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      userId: {
        // toma id del usuario que dio like
        type: DataTypes.UUID,
        allowNull: false,
        field: "UserId",
      },
      publicationId: {
        // toma el id de la publicacion
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

