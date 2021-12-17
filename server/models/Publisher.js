const { Schema, model } = require('mongoose');

const publisherModel = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    addressId: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    }
})

module.exports = model('Publisher', publisherModel)