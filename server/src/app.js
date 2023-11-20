//Importacion de modulo y configuracion necesaria inicial
const express = require("express");
const cokieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");
const { createServer } = require("http");
const { Server } = require("socket.io");
const {authHandler} = require("./handlers/Authentication/authHandler"); //middleware para proteccion de rutas
require("./db.js");


// Configuración del servidor Express
const server = express();
server.name = "API";
const httpServer = createServer(server);
const io = new Server(httpServer,{pingInterval: 10000});
global.io = io;

// Configuración de eventos para conexiones y desconexiones en WebSocket
io.on("connection", (socket) => {
  console.log('Nuevo usuario conectado por websocket')
});
io.on("disconnect", () => {
  console.log('Usuario desconectado de websocket')
})

// Configuración de middleware y CORS
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cokieParser());
server.use(morgan("dev"));
server.use((_req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:19789",
    "http://localhost:5173"
  ); // Actualizar para que coincida con el dominio desde el cual se realizará la solicitud
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//--------Proteccion de rutas-----------------
 //middleware para proteccion de rutas
 server.use((req, res, next) => {
  if (req.originalUrl === "/forgotpassword" || req.originalUrl === "/login" || req.originalUrl === "/register" || req.originalUrl === "/authGoogle" || req.originalUrl === "/ongs" || "/resetpassword") {
    next(); // Si la ruta es /login, /register o /authGoogle, no se necesita autenticación
  } else {
    authHandler(req, res, (error) => {
      if (error) {
        // Aquí, maneja la respuesta si la autenticación falla o el token es inválido
        console.error("Error de autenticación:", error);

        // Redirige al usuario a la página de inicio de sesión
        return res.redirect("/login");
      }

      // Si la autenticación es exitosa, continúa con la solicitud
      next();
    });
  }
});


// Configuración de rutas principales
server.use("/", routes);
// Manejo de errores
server.use((err, _req, res, _next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
// Exportación del servidor HTTP para ser utilizado en otros lugares
module.exports = httpServer;
