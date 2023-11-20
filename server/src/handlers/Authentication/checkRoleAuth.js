const { User } = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Este middlewere valida si el usuario tiene el rol de admin para poder acceder a las rutas que lo requieran
//no es usada en ninguna ruta ya que se decidio que el rol de admin solo se puede asignar desde la BD
const checkRoleAuth = async (req, res) => {

    const { authorization } = req.headers;
    let token = "";

    //si el encabezado comienza con "Bearer " extraigo el token que esta despues del Bearer.
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    

    if (!token)
        return res.status(401).json({ error: "token missing or invalid" });


        try { //valido token con clave privada almacenada en enviroment
            let decodenToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            const user = await User.findOne({ where: { id: decodenToken.id } });

            if (!user.admin) {
                return res.json({ admin: false });
            }

            return res.json({ admin: true });


        } catch (error) {
            return res
                .status(401)
                .json({ error: "Error en la validacion del token" });
        }

}

module.exports = { checkRoleAuth };