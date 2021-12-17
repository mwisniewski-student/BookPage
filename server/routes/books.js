const express = require('express');
const router = express.Router({ mergeParams: true });

const Book = require('../models/Book')

router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        const response = await book.save()
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Book.findByIdAndDelete(id)
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

module.exports = router