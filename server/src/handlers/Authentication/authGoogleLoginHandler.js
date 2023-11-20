const { User } = require("../../db");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

//Este handler sirve para autenticar usuario cuando hace login con google, previamente registrado en la cartelera
const authGoogleHandler = async (req, res) => {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const { idToken } = req.body;

    try {
        const response = await client.verifyIdToken({  //valido token de google con id cliente de auth2.0
            idToken,
            audience: process.env.CLIENT_ID,
        });
        const { email } = response.payload;

        const userExist = await User.findOne({ where: { email: email } }); //busco usuario en cartelera con email de google

        if(!userExist.active){
            return res.status(400).json({ message: "Tu cuenta se encuentra suspendida" });
        }

        if (userExist) {
            const payload = { id: userExist.id };
            const privateKey = process.env.JWT_PRIVATE_KEY;
            const token = jwt.sign(payload, privateKey, { //firma de token con el ID del usuario para usar en autenticacion de rutas
                algorithm: "HS256",
                expiresIn: "10d",
            });
            return res.send({ jwt: token, id: userExist.id }); //envio token y id de usuario para almacenar en localstorage y usar desde cliente
        } else {
            return res.status(400).json({
                message:
                    "El correo electrónico no está registrado, por favor regístrese",
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error en la autenticación" });
    }
};



module.exports = { authGoogleHandler };
