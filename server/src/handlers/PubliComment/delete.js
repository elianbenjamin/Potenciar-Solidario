const {DeleteController} = require('../../controllers/PubliComment/delete') 

const DeleteHandler = async (req , res) => {

    try {
        const {id} = req.params
        if(!id) throw new Error ("No se pudo borrar el comentario por falta de id")

        const deleteComment = await DeleteController(id)

        return res.status(200).json(deleteComment)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {DeleteHandler}