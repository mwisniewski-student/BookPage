const { Schema, model } = require('mongoose');
const Book = require('./Book')

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

authorModel.post('findOneAndDelete', async doc => {
    if (doc) {
        await Book.deleteMany({
            authorsIds: doc._id
        })
    }
})

module.exports = model('Author', authorModel)