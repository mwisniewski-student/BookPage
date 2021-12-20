const { Schema, model } = require('mongoose');

const authorModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    }
})

module.exports = model('Author', authorModel)