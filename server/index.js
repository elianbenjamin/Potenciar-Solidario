// Importación del servidor HTTP y la conexión a la base de datos desde archivos separados
const httpServer = require("./src/app");
const { conn } = require("./src/db");

// Definición del puerto a utilizar, obtenido de las variables de entorno
const PORT = process.env.DB_PORT;

// Sincronización de la base de datos y inicio del servidor
conn
  .sync({ force: false })  // La opción "force: false" evita la eliminación de datos existentes en cada sincronización
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`server conectado a base de datos, puerto ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
