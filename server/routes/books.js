const express = require('express');
const catchAsync = require('../utils/catchAsync')
const router = express.Router({ mergeParams: true });

const Book = require('../models/Book')

router.post('/', catchAsync(async (req, res) => {
    const book = new Book(req.body);
    await book.save()
    const { _id, ...rest } = book._doc
    res.send({ id: _id, ...rest })
}))

router.get('/', catchAsync(async (req, res) => {
    const books = await Book.find();
    res.send(books.map(book => {
        const { _id, ...rest } = book._doc
        return ({ id: _id, ...rest })
    }))
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    const { _id, ...rest } = book._doc
    res.send({ id: _id, ...rest })
}))

router.get('/by-author/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const books = await Book.find({ authorsIds: id });
    res.send(books.map(book => {
        const { _id, ...rest } = book._doc
        return ({ id: _id, ...rest })
    }))
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const { _id, ...rest } = response._doc
    res.send({ id: _id, ...rest })
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await Book.findByIdAndDelete(id)
    response ? res.send(response) : res.status(404).send('Not found')
}))

module.exports = router