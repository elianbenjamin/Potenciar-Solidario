const { User, Otp } = require("../../db");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { emailForgotPassword } = require("../emailNotif/forgotPasswordHandler");

//esta funcion envia un mail de restablecimiento de contraseña luego de validar el email
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    

    try {
        const user = await User.findOne({ where: { email : email } });
      
        if (!user) {
            return res.status(400).json({
                message:
                    "El correo electrónico no está registrado, verifique nuevamente o registrese para continuar",
            });
        }
        // si el email es valido creo un token con el id del usuario para enviarlo por mail
        const payload = { id: user.id };
        const privateKey = process.env.JWT_PRIVATE_KEY;
        const token = jwt.sign(payload, privateKey, { 
            algorithm: "HS256",
            expiresIn: "1h",
        });
        const otpFind = await Otp.findOne({ where: { email: email } });
        if(otpFind){
            await otpFind.destroy()
        }
        //one time password crea en la bd un registro con el email y el token generado
        const otp = await Otp.create({email: email, token: token})
        let verificationLink = `http://localhost:5173/new-password/?token=${token}`; //link al que va a acceder el usuario con el token generado en el mismo para que front extraiga de params
        emailForgotPassword(user,verificationLink) //funcion que recibe usuario y link y que envia la plantilla de rest de clave

        return res.status(200).json("Se ha enviado un correo electrónico para restablecer su contraseña");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {forgotPassword}