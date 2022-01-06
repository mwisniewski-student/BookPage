const { Schema, model } = require('mongoose');
const categories = require('../categories');
const Review = require('./Review')

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 40,
        unique: true
    },
    description: String,
    categories: {
        type: Array,
        required: true,
        validate: {
            validator: array => {
                return array.every(category => categories.includes(category)) && array.length > 0
            }
        }
    },
    publishDate: {
        type: Date,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        match: /^https?:\/\/.+\/.+$/
    },
    authorsIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

bookSchema.post('findOneAndDelete', async doc => {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = model('Book', bookSchema)