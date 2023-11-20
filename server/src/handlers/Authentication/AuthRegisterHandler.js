const { User } = require("../../db.js");
const bcrypt = require("bcryptjs");
const { emailSender } = require("../emailNotif/emailRegisterHandler.js");
const {Organization} = require('../../db.js');

//Este handler sirve para registrar usuario  con contraseña encriptada en BD
const authRegisterHandler = async (req, res) => {
    const {
        email,
        name,
        lastname,
        description,
        DNI,
        birth_date,
        phone,
        profile_picture,
        habitual_location_of_residence,
        geographical_area_residence,
        admin,
        password,
        organization
    } = req.body;


    try {
        const userExist = await User.findOne({ where: { email: email } });
        const organizationSearch = await Organization.findOne({ where: { nombre: organization } });
      
        if(organizationSearch === null){
            throw new Error("No se encontro la organizacion en la BD")
        }
        let organizationId = null;

        if (userExist  !== null) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        //haseo la clave ingresada por el usuario y creo el usuario en BD
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ 
            name,
            email,
            lastname,
            description,
            DNI,
            birth_date,
            phone,
            profile_picture,
            habitual_location_of_residence,
            geographical_area_residence,
            admin,
            organization,
            organizationId:organizationSearch.id,
            password: hashPassword,
        });

        emailSender(user)
        

        const userWithoutPassword = JSON.parse(JSON.stringify(user)); //paso el objeto a json para poder eliminar la clave
        delete userWithoutPassword.password; //elimino clave del objeto para retornarlo sin la misma



        res.status(200).json({ userWithoutPassword }); //retorno todos los datos del usuario para qu puedan usar en cliente (menos la clave)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authRegisterHandler };
