const {DeleteReview} = require('../../controllers/Reviews/DeleteReviewC')

const DeleteReviewHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const review = await DeleteReview(id)
        if (!review) throw new Error('No se ha podido eliminar la review.')
        res.status(200).send({message:'Review eliminado correctamente', data: review});
        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = {
    DeleteReviewHandler
}