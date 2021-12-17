const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    streetName: String,
    streetNumber: String,
    apartamentNumber: String
})

module.exports = model('Address', addressSchema)