const { Schema, model } = require('mongoose');
const categories = require('../categories');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 40,
        unique: true
    },
    authors: {
        type: String,
        required: true,
        maxlength: 40
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
    publisherId: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    }
});

module.exports = model('Book', bookSchema)