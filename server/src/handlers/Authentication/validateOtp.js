const { Otp } = require("../../db");
const jwt = require("jsonwebtoken");
const otpValidate = async (req, res) => {
//esta funcion valida el token generado para restablecer la contraseña en la BD 
    try {
        const { authorization } = req.headers;
        let token = "";
        if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
            token = authorization.substring(7);
        }
        
        //si el token no existe o ya fue utilizado retorno error (en reset password al cambiar la contraseña elimino ese token de BD)
        const user = await Otp.findOne({ where: { token : token } });
        if (!user) {
            return res.status(400).json({
                message:
                    "El token ya fue utilizado, solicite reseteo de clave nuevamente",
            });
        }
        //valido token con clave privada almacenada en enviroment
        let decodenToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);

       //si el token es invalido porque caduco o fue modificado retorno error
        if(!decodenToken) {
            return res.status(400).json({
                message:
                    "El token es invalido, solicite reseteo de clave nuevamente",
            });
        }
        
        return res.status(200).json("Validado correctamente");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {otpValidate}