const {PublicationComment} = require("../../db")

const PutController = async (id , comment ) => {

    const commentActual = await PublicationComment.findByPk(id)

    if(!commentActual) throw new Error ( 'No se encontro comentario con ese id')
    
    commentActual.comment = comment

    await commentActual.save()

    return commentActual
}

module.exports = {PutController}