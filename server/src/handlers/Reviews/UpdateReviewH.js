const {UpdateReviewC} = require('../../controllers/Reviews/UpdateReviewC')

const UpdateReviewHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { review } = req.body;
      const updateReview = await UpdateReviewC(id, { review });
  
      if (!updateReview) {
        return res
          .status(404)
          .json({ msg: "No se ha podido actualizar la review" });
      }
      return res.status(200).json(updateReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = { UpdateReviewHandler };