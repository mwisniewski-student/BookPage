const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')

const Address = require('../models/Address');

router.post('/', catchAsync(async (req, res) => {
    const address = new Address(req.body);
    const response = await address.save()
    res.send(response)
}))

router.get('/', catchAsync(async (req, res) => {
    const addresses = await Address.find();
    res.send(addresses.map(address => {
        const { _id, ...rest } = address._doc
        return ({ id: _id, ...rest })
    }))
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const address = await Address.findById(id);
    const { _id, ...rest } = address._doc
    res.send({ id: _id, ...rest })
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await Address.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.send(response)
}))

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await Address.findByIdAndDelete(id)
    response ? res.send(response) : res.status(404).send('Not found')
}))

module.exports = router