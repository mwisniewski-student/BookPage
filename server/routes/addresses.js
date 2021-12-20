const express = require('express');
const router = express.Router({ mergeParams: true });

const Address = require('../models/Address');

router.post('/', async (req, res) => {
    try {
        const address = new Address(req.body);
        const response = await address.save()
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.get('/', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.send(addresses)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Address.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
        res.send(response)
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Address.findByIdAndDelete(id)
        response ? res.send(response) : res.status(404).send('Not found')
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
})

module.exports = router