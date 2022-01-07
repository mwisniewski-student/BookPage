const express = require('express');
const catchAsync = require('../utils/catchAsync')
const router = express.Router({ mergeParams: true });
const ExpressError = require('../utils/ExpressError');

const Book = require('../models/Book')
const Author = require('../models/Author')

router.post('/', catchAsync(async (req, res) => {
    const book = new Book(req.body);
    await book.save()
    const { _id, ...rest } = book._doc
    res.send({ id: _id, ...rest })
}))

router.get('/', catchAsync(async (req, res) => {
    const books = await Book.find().populate('reviews');
    res.send(books.map(book => {
        const { _id, ...restBook } = book._doc
        const reviews = book.reviews.map(x => {
            const { _id, ...restReview } = x._doc;
            return { id: _id, ...restReview }
        })
        restBook.reviews = reviews
        return { id: _id, ...restBook }
    }))
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    if (typeof id !== 'string' || id.length !== 24) {
        throw new ExpressError('Wrong id given', 404)
    }
    const book = await Book.findById(id).populate('reviews');
    if (!book) throw new ExpressError('Book not found', 404)
    const { _id, ...restBook } = book._doc
    const reviews = book.reviews.map(x => {
        const { _id, ...restReview } = x._doc;
        return { id: _id, ...restReview }
    })
    restBook.reviews = reviews
    res.send({ id: _id, ...restBook })
}))

router.get('/by-author/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const books = await Book.find({ authorsIds: id }).populate('reviews');
    res.send(books.map(book => {
        const { _id, ...restBook } = book._doc
        const reviews = book.reviews.map(x => {
            const { _id, ...restReview } = x._doc;
            return { id: _id, ...restReview }
        })
        restBook.reviews = reviews
        return { id: _id, ...restBook }
    }))
}))

router.get('/:id/authors', catchAsync(async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id);
    if (!book) throw new ExpressError('Book not found', 404)
    const authors = await Author.find().where('_id').in(book.authorsIds);
    if (!authors.length) { throw new ExpressError('No authors found', 404) }
    res.send(authors.map(author => {
        const { _id, ...rest } = author._doc
        return ({ id: _id, ...rest })
    }))
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }).populate('reviews')
    const { _id, ...restBook } = book._doc
    const reviews = book.reviews.map(x => {
        const { _id, ...restReview } = x._doc;
        return { id: _id, ...restReview }
    })
    restBook.reviews = reviews
    res.send({ id: _id, ...restBook })
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id).populate('reviews')
    if (!book) { throw new ExpressError('Book doesn\'t exists', 404) }
    const { _id, ...restBook } = book._doc
    const reviews = book.reviews.map(x => {
        const { _id, ...restReview } = x._doc;
        return { id: _id, ...restReview }
    })
    restBook.reviews = reviews
    res.send({ id: _id, ...restBook })
}))

module.exports = router