const { Review } = require("../../db");

const UpdateReviewC = async (id, userData) => {
  try {
    const updateReview = await Review.findByPk(id);
    if (!updateReview) {
      throw new Error("Review no encontrada");
    }
    updateReview.review = userData.review;
    await updateReview.save();
  } catch (error) {
    throw new Error("No se ha podido actualizar la review");
  }
};
module.exports = { UpdateReviewC };
