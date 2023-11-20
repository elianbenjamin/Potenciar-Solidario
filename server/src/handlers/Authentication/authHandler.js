const { User } = require("../../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*Este middleware sirve para proteger las rutas que necesitan autenticación
y validar jwt que se generan en inicios de sesion tanto con google como con email y contraseña. Se usa en routes/index.js y en db.js para proteger toda las rutas a excepcion de algunas
*/

//Bearer.asddasd1w49801hnfo8912
const authHandler = async (req, res, next) => {
    //obtengo el authorization que se envia por el header de la solicitud en formato Bearer token
    const { authorization } = req.headers; 
    let token = "";

    //si el encabezado comienza con "Bearer " extraigo el token que esta despues del Bearer.
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        token = authorization.substring(7);
    }

    if (!token)
        return res.status(401).json({ error: "token missing or invalid" });

    try { //valido token con clave privada almacenada en enviroment
        let decodenToken = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.userId = decodenToken.id; //saco el id de del token y lo guardo en el req para usarlo en el handler que se ejecuta lugo del middelwere
        if (decodenToken) {
            console.log("token valido");
            next(); //Ejecuta la siguiente funcion del path
        }
    } catch (error) {
        return res
            .status(401)
            .json({ error: "Error en la validacion del token" });
    }
};

module.exports = { authHandler };
