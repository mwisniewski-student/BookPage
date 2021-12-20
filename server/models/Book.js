const { Schema, model } = require('mongoose');
const categories = require('../categories');

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
    }]
});

module.exports = model('Book', bookSchema)