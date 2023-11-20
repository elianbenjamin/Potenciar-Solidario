const jwt = require("jsonwebtoken");
const { User,Otp } = require("../../db");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {resetSuccess} = require("../emailNotif/resetSuccess");

//esta funcion recibe el token y la nueva contraseña y la actualiza en la BD
const resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { authorization } = req.headers;
    let token = "";

    if(!(newPassword && authorization)){
        return res.status(400).json({message: "Faltan datos"})
    }
    //si el encabezado comienza con "Bearer " extraigo el token que esta despues del Bearer.
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }
    if (!token)
        return res.status(401).json({ error: "token missing or invalid" });

        try { //valido token con clave privada almacenada en enviroment
            let decodenToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.userId = decodenToken.id;
            if (decodenToken) {
                //busco usuario en BD y actualizo la clave
                const user = await User.findOne({ where: { id: decodenToken.id } });
              //haseo clave ingresada por usuario y actualizo en BD
                const hashPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashPassword;
                await user.save()
                resetSuccess(user.email)
                //elimino token  OTP de la base de datos para que no pueda ser validado nuevamente
                const cleanToken = await Otp.destroy({ where: { token: token } });
                return res.status(200).json({message: "Contraseña actualizada"})
            }
        } catch (error) {
            return res
                .status(401)
                .json({message: error.message });
        }
}

module.exports = {resetPassword}