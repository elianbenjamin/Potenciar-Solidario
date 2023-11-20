const { Publication, User, Like, PublicationComment } = require("../../db");


// Controlador para aplicar filtros a las publicaciones
const applyFilters = async (req, res) => {
  try {
    // Obtener parámetros de consulta para filtrar
    const { category, ong, fromDate, untilDate, user } = req.query;
// Obtener todas las publicaciones con sus relaciones (likes, usuario creador, comentarios)
    let allPosts = await Publication.findAll({
      include: [
        { model: Like, attributes: ['id','userId'], include: {model: User , attributes: ['name']}},
        { model: User, attributes: ['name',  'profile_picture']},
        { model: PublicationComment}
      ]
    });
    // Filtrar publicaciones según los parámetros de consulta
    if (category !== "") {
      allPosts = allPosts.filter((post) => post.category === category);
    }

    if (ong !== "") {
      allPosts = allPosts.filter((post) => post.organization === ong);
    }

    if (fromDate !== "") {
      allPosts = allPosts.filter((post) => post.startDate >= fromDate);
    }

    if (untilDate !== "") {
      allPosts = allPosts.filter((post) => post.startDate <= untilDate);
    }

    if (user !== "") {
      allPosts = allPosts.filter(post => post.userID === user);
    }
    // Enviar una respuesta con el estado 200 (éxito) y las publicaciones filtradas
    res.status(200).json(allPosts);

  } catch (error) {
     // En caso de error, enviar una respuesta con el estado 400 (solicitud incorrecta) y un mensaje de error
   
    res.status(400).send("No se pudieron obtener las publicaciones filtradas");
  }
};

module.exports = { applyFilters };
