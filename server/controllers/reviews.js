const Book = require("../models/Book");
const Review = require("../models/Review");

const ExpressError = require("../utils/ExpressError");

module.exports.createReview = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");
  if (!book) throw new ExpressError("No book with given id", 404);
  const review = new Review(req.body);
  book.reviews.push(review);
  await review.save();
  await book.save();
  res.send(book);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const book = await Book.findByIdAndUpdate(
    id,
    { $pull: { reviews: reviewId } },
    { runValidators: true, new: true }
  ).populate("reviews");
  if (!book) throw new ExpressError("Book doesn't exist", 404);
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) throw new ExpressError("Review doesn't exist", 404);
  res.send(book);
};
