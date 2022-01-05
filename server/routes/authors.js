const express = require('express');
const catchAsync = require('../utils/catchAsync')
const router = express.Router({ mergeParams: true });

const Author = require('../models/Author')
const Book = require('../models/Book');
const ExpressError = require('../utils/ExpressError');

router.post('/', catchAsync(async (req, res) => {
    const author = new Author(req.body);
    await author.save()
    const { _id, ...rest } = author._doc
    res.send({ id: _id, ...rest })
}))

router.get('/', catchAsync(async (req, res) => {
    const authors = await Author.find();
    res.send(authors.map(author => {
        const { _id, ...rest } = author._doc
        return ({ id: _id, ...rest })
    }))
}))

router.get('/byIds', catchAsync(async (req, res) => {
    const { authorsIds } = req.body
    const authors = await Author.find().where('_id').in(authorsIds);
    if (!authors.length) { throw new ExpressError('No authors found', 404) }
    res.send(authors.map(author => {
        const { _id, ...rest } = author._doc
        return ({ id: _id, ...rest })
    }))
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    if (typeof id !== 'string' || id.length !== 24) {
        throw new ExpressError('Wrong id given', 404)
    }
    const author = await Author.findById(id);
    if (!author) { throw new ExpressError('Author not found', 404) }
    const { _id, ...rest } = author._doc
    res.send({ id: _id, ...rest })
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await Author.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const { _id, ...rest } = response._doc
    res.send({ id: _id, ...rest })
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const authorDeleted = await Author.findByIdAndDelete(id)
    if (authorDeleted) {
        await Book.deleteMany({
            authorsIds: authorDeleted._id
        })
        return res.send(authorDeleted)
    }
    throw new ExpressError('Author doesn\'t exist', 404)
}))

module.exports = router