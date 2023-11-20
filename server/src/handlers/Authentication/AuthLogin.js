const { User } = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Este handler sirve para autenticar usuario cuando hace login con email y contraseña
const authLoginHandler = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        return res.status(400).json({ message: "Ingrese email y contraseña" });
    }

    try {
        const userExist = await User.findOne({ where: { email: email } }); //busco usuario en BD
        if (!userExist) {
            return res
                .status(400)
                .json({ message: "error en la utenticacion" });
        }

        if(!userExist.active){
            return res.status(400).json({ message: "Tu cuenta ha sido suspendida" });
        }

        const passwordValid = await bcrypt.compare( //comparo clave ingresada con clave encriptada en BD
            password,
            userExist.password
        );
        if (!passwordValid)
            return res
                .status(400)
                .json({ message: "error en la utenticacion" });

        if (passwordValid) {
            try {
                //firma de token con el id del usuario para usar en autenticacion de rutas
                const payload = { id: userExist.id };
                const privateKey = process.env.JWT_PRIVATE_KEY;
                const token = jwt.sign(payload, privateKey, {
                    algorithm: "HS256",
                    expiresIn: "10d",
                });

                return res.send({ jwt: token, id: userExist.id }); //envio token y id de usuario para almacenar en localstorage y usar desde cliente
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error en la generación del token" });
            }
        } else {
            return res
                .status(400)
                .json({ message: "error en la autenticación" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error de servidor" });
    }
};

module.exports = { authLoginHandler };
