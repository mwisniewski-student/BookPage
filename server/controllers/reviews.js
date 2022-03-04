const Book = require("../models/Book");
const Review = require("../models/Review");

const ExpressError = require("../utils/ExpressError");
const map_idToId = require("../utils/map_idToId");

module.exports.createReview = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("reviews");
  if (!book) throw new ExpressError("No book with given id", 404);
  const review = new Review(req.body);
  book.reviews.push(review);
  await review.save();
  await book.save();
  const bookMappedToResponseFormat = map_idToId(book._doc);
  const reviews = book.reviews.map((book) => map_idToId(book._doc));
  bookMappedToResponseFormat.reviews = reviews;
  res.send(bookMappedToResponseFormat);
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
  const bookMappedToResponseFormat = map_idToId(book._doc);
  const reviews = book.reviews.map((x) => map_idToId(x._doc));
  bookMappedToResponseFormat.reviews = reviews;
  res.send(bookMappedToResponseFormat);
};
