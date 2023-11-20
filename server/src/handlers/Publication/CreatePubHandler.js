const {CreatePublication} = require("../../controllers/Publication/CreatePublication");
const {Category} = require('../../db.js');

// Controlador para crear una nueva publicación
const createPublicationHandler = async (req, res) => {
    // Extraer datos de la solicitud

    const {
        title,
        description,
        category,
        startDate,
        endDate,
        modificationDate,
        creationDate,
        status,
        organization,
        url,
        image,
        registrationLink,
        contact,
         likes 
    } = req.body;
// Obtener el ID del usuario de la solicitud (asumir que está incluido en el token de autenticación)
    const userId = req.userId;
    



    try {
        // Buscar la categoría en la base de datos
        const categorySearch = await Category.findOne({ where: { name: category } });
        // Lanzar un error si la categoría no se encuentra en la base de datos
        if(categorySearch === null){
            throw new Error("No se encontro la categoria en la BD")
        }
         // Obtener el ID de la categoría
        let categoryId = null;
        if(categorySearch){
            categoryId = categorySearch.id;
            
        }
        
       
        // Validar campos obligatorios
        if (!title || !description || !category || !contact || !organization)
            throw new Error("Faltan campos obligatorios");
        const publication = await CreatePublication({
            title,
            description,
            category,
            startDate,
            endDate,
            modificationDate,
            creationDate,
            status,
            organization,
            url,
            image,
            registrationLink,
            contact,
            likes, 
            userID:userId,
            categoryId:categoryId
        });

        res.status(201).json(publication);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createPublicationHandler };
