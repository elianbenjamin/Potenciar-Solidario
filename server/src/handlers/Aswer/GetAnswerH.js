const { GetAnswer } = require("../../controllers/Aswer/GetAnswer");


// Controlador para obtener respuestas a preguntas
const GetAnswerH = async (req, res) => {
    // Obtener el parámetro de la ruta que representa el ID de la pregunta
    const {id} = req.params
    try {
         // Verificar si se proporcionó un ID de pregunta específico
        if(id){
             // Obtener todas las respuestas asociadas a la pregunta con el ID proporcionado
       const allAnswer = await GetAnswer(id)

        // Verificar si existen respuestas para la pregunta
       if(allAnswer.length === 0) throw new Error('No existen respuestas.')

       // Devuelve un estado de 201 cuando encontró la respuesta
       return res.status(201).json(allAnswer)
        }
     
       const getAllAnswers = await GetAnswer()
       res.status(200).json(getAllAnswers)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    GetAnswerH
};