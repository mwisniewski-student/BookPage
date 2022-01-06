const express = require('express');
const router = express.Router({ mergeParams: true });

const Book = require('../models/Book');
const Review = require('../models/Review');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', catchAsync(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) throw new ExpressError('No book with given id', 404)
    const review = new Review(req.body);
    book.reviews.push(review);
    await review.save();
    await book.save();
    const { _id, ...restBook } = book._doc
    const reviews = book.reviews.map(x => {
        const { _id, ...restReview } = x._doc;
        return { id: _id, ...restReview }
    })
    restBook.reviews = reviews
    res.send({ id: _id, ...restBook })
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const res1 = await Book.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if (!res1) throw new ExpressError("Book doesn\'t exist", 404)
    const res2 = await Review.findByIdAndDelete(reviewId);
    if (!res1) throw new ExpressError("Review doesn\'t exist", 404)
    const { _id, ...rest } = res2._doc
    res.send({ id: _id, ...rest })
}))

module.exports = router;