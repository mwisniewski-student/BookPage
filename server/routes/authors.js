const express = require('express');
const router = express.Router({ mergeParams: true });

const Author = require('../models/Author')

router.post('/', async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save()
        const { _id, ...rest } = author._doc
        res.send({ id: _id, ...rest })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.send(authors.map(author => {
            const { _id, ...rest } = author._doc
            return ({ id: _id, ...rest })
        }))
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Author.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        const { _id, ...rest } = response._doc
        res.send({ id: _id, ...rest })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Author.findByIdAndDelete(id)
        response ? res.send(response) : res.status(404).send('Not found')
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

module.exports = router