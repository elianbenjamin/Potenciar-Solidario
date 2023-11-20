const { CreateReviewC } = require("../../controllers/Reviews/CreateReviewC");

const CreateReviewHandler = async (req, res) => {
  const { review, userId, publicationId } = req.body;
try {
  if (!review || !userId || !publicationId) {
    throw new Error("La answer, userId y questionId son obligatorios");
  }
  const Review = await CreateReviewC({ review, userId, publicationId });
  res.status(201).json(Review);
} catch (error) {
  console.log(error)
  res.status(400).json({ error: error.message });
}

};
module.exports = { CreateReviewHandler };