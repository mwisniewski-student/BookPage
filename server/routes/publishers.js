const express = require('express');
const router = express.Router({ mergeParams: true });

const Publisher = require('../models/Publisher')

router.post('/', async (req, res) => {
    try {
        const publisher = new Publisher(req.body);
        const response = await publisher.save()
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.get('/', async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.send(publishers)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Publisher.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Publisher.findByIdAndDelete(id)
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

module.exports = router