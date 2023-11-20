const { DeleteAnswer } = require("../../controllers/Aswer/DeleteAnswer");

// Este handlers se va a encargar de eliminar la respuesta ya que el id es extraido por params
// tambien es una funcion asincrona
const DeleteAnswerH = async (req, res) => {
    const {id} = req.params;
    // colocamos un try catch para manejar errores y en caso de que lo haya lo atrapa
    try {
        const answer = await DeleteAnswer(id)
        // ponemos la condicion de que si no existe dicha respuesta lanzamos un throw new Error y esto cae en el catch
        if (!answer) throw new Error('No se ha podido eliminar Respuesta.')
        // en caso de salir todo ok respondemos con un status 200
        res.status(200).send({message:'Registro Eliminado Correctamente', data: answer});
        
    } catch (error) {
        // Basicamente ente es el manejador de errores y responde con un status de 404 error de servidor y msj respectivo.
        res.status(404).json({error: error.message})
    }
}

// exportamos la funcion para poder requerirla en las rutas.
module.exports = {
    DeleteAnswerH
}