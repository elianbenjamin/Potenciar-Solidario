const { Review } = require("../../db");

const CreateReviewC = async ({ review, userId, publicationId }) => {
  const newReview = await Review.create({ review, userId, publicationId });
  if (!newReview) {
    throw new Error("No se pudo crear el review");
  }

//global.io.emit(`question_${publicationId}`);//!

  return newReview;
};
module.exports = { CreateReviewC };
