const { DataTypes } = require("sequelize");
//Exportamos una funcion que defina el modelo
//Luego le inyectamos la conexion a sequelize

module.exports = (sequelize) => {
  // Defino el modelo "User"
  sequelize.define(
    "User",
    {
      //ID unico del usuario generado automaticamente con UUID
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      // Correo electronico del usurio
      email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Contraseña del usuario encriptada
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      //Apellido del usuario
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Descripcion del usuario (puede ser nula)
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Numero de documento de identidad del usuario con el atributo que debe ser unico.
      DNI: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: {
          isInt: true,
        },
      },
      // Fecha de nacimiento del usuario
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
       // Número de teléfono del usuario (puede ser nulo)
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
     
      },
      // Organización a la que pertenece el usuario
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // URL de la imagen de perfil del usuario (puede ser nula)
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Ubicación habitual de residencia del usuario (puede ser nula)
      habitual_location_of_residence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Área geográfica de residencia del usuario (puede ser nula)
      geographical_area_residence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
       // Indica si el usuario tiene privilegios de administrador (por defecto, false)
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // Contraseña del usuario
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Estado de activación del usuario (por defecto, true)
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
