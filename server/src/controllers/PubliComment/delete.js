const {PublicationComment} = require('../../db')

const DeleteController = async  (id) => {

    const Comment = await PublicationComment.destroy({
        where: {id : id}
    })

    if(!Comment) throw new Error ("No se encontro comentario con ese id para borrar")

    return Comment
} 

module.exports = {DeleteController} 