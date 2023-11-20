const { DeleteCommentC } = require("../../controllers/Comments/DeleteCommentC");


// Controlador para manejar la eliminación de comentarios
const DeleteCommentHandler = async (req, res) => {
     // Obtener el ID del comentario de los parámetros de la solicitud
    const {id} = req.params;
    try {
        // Utilizar la función del controlador correspondiente para eliminar el comentario
        const comment = await DeleteCommentC(id)
        // Verificar si el comentario se eliminó correctamente
        if (!comment) throw new Error('No se ha podido eliminar el comentario.')
        // Enviar una respuesta con el estado 200 (éxito) y un mensaje de éxito junto con los datos del comentario eliminado
        res.status(200).send({message:'Comentario eliminado correctamente', data: comment});
        
    } catch (error) {
        // En caso de error, enviar una respuesta con el estado 404 (no encontrado) y detalles del error
        res.status(404).json({error: error.message})
    }
}
// Exportar el controlador para su uso en otras partes de la aplicación
module.exports = {
    DeleteCommentHandler
}