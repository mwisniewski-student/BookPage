const { Schema, model } = require("mongoose");
const categories = require("../categories");
const Review = require("./Review");
const Author = require("./Author");
const ExpressError = require("../utils/ExpressError");

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book title is required."],
    maxlength: [40, "Book title can contain maximally 40 characters."],
    unique: [true, "Book title must be unique."],
  },
  description: {
    type: String,
    max: [1000, "Book description can contain maximally 1000 characters."],
  },
  categories: {
    type: Array,
    required: [true, "categories is required."],
    validate: {
      validator: (array) => {
        return (
          array.every((category) => categories.includes(category)) &&
          array.length > 0
        );
      },
      message: "categories must be an Array of valid categories.",
    },
  },
  publishDate: {
    type: Date,
    required: [true, "publishDate is required"],
  },
  numberOfPages: {
    type: Number,
    required: [true, "numberOfPages is required"],
    min: [1, "numberOfPages must be greater or equal to 1"],
  },
  image: {
    type: String,
    match: [/^https?:\/\/.+\/.+$/, "image must be a valid url"],
  },
  authorsIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Author",
      validate: {
        validator: async (id) => {
          return await Author.exists({ _id: id });
        },
        message: "Wrong authorId given",
      },
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
      validate: {
        validator: async (id) => {
          return await Review.exists({ _id: id });
        },
        message: "Wrong reviewId given",
      },
    },
  ],
});

bookSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

bookSchema.virtual("id").get(function () {
  return this._id;
});

bookSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

bookSchema.post("save", function async(error, doc, next) {
  if (error.code === 11000 && error.keyPattern.title) {
    next(new ExpressError("Book title must be unique", 400));
  } else {
    next(error);
  }
});

module.exports = model("Book", bookSchema);
