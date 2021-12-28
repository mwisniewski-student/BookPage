const express = require('express');
const catchAsync = require('../utils/catchAsync')
const router = express.Router({ mergeParams: true });

const Author = require('../models/Author')

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

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const author = await Author.findById(id);
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
    const response = await Author.findByIdAndDelete(id)
    response ? res.send(response) : res.status(404).send('Not found')
}))

module.exports = router