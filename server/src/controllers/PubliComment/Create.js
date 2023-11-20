const {PublicationComment} = require('../../db')

const CreateController = async ({userId , publicationId , comment}) => {
    const createComment = await PublicationComment.create({userId , publicationId , comment})
    if(!createComment) throw new Error ('No se pudo crear el comentario')

    return createComment
}

module.exports = {CreateController}