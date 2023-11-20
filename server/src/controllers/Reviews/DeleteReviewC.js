const { Review } = require("../../db");

const DeleteReview = async (id) => {
    const reviewDelete = await Review.destroy(id)
    if(!reviewDelete) throw new Error('No se ha podido eliminar la review.')
    return reviewDelete;
}

module.exports = {
    DeleteReview,
}