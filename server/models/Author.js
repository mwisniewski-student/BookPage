const { Schema, model } = require('mongoose');

const authorModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 40
    },
    description: String,
    image: {
        type: String,
        match: /^https?:\/\/.+\/.+$/
    },
    birthDate: {
        type: Date,
        required: true
    },
    addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }
})

module.exports = model('Author', authorModel)