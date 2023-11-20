const { DataTypes } = require("sequelize");


//Exportamos una funcion que define el modelo "Publication"
module.exports = (sequelize) => {
  sequelize.define(
    "Publication",
    {
      //Indentificamos un id unico y auntoincremental
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
      //Titulo de la publicacion
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isString: (value) => {
            if (typeof value !== "string") {
              throw new Error("El titulo debe contener texto válido"); //!
            }
          },
          len: [5, 200], // Longitud permitida entre 5 y 200 caracteres
        },
      },
      // Descripcion de la publicacion
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [20, 1000], // Longitud entre 20 y 1000 caracteres
        },
      },
      // Categoria de la publicación
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Fecha de inicio de la publicación
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
       // Fecha de finalización de la publicación (puede ser nula)
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
        isDate: true,
        },
      },
       // Fecha de modificación de la publicación (puede ser nula)
      modificationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
          isBefore: "2025-10-01",
        },
      },
      // Fecha de creación de la publicación (puede ser nula)
      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
       // Estado de la publicación (puede ser nulo)
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      // Organización responsable de la publicación
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 100], // Longitud permitida entre 4 y 100 caracteres
        },
      },
      // URL asociada a la publicación (puede ser nula)
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
         // Ruta de la imagen asociada a la publicación (puede ser nula)
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       // Enlace de registro asociado a la publicación (puede ser nulo)
      registrationLink: {
        type: DataTypes.STRING,
        allowNull: true,
   
      },
       // Información de contacto asociada a la publicación (puede ser nula)
      contact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
        // Número de likes asociados a la publicación, valor predeterminado 0
     likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isInt: true,
          min: 0, 
        },
      },
    },
    { timestamps: false } // Evita la creación automática de campos createdAt y updatedAt
  );
};
