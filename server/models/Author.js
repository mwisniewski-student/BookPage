const { Schema, model } = require("mongoose");
const Book = require("./Book");

const authorModel = new Schema({
  name: {
    type: String,
    required: [true, "Author name is required"],
    unique: [true, "Author name must be unique"],
    maxlength: [40, "Author name can contain maximally 40 characters"],
  },
  description: {
    type: String,
    max: [1000, "Author description can contain maximally 1000 characters."],
  },
  image: {
    type: String,
    match: [/^https?:\/\/.+\/.+$/, "Image must be valid url."],
  },
  birthDate: {
    type: Date,
    required: [true, "birthDate is required"],
  },
});

authorModel.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Book.deleteMany({
      authorsIds: doc._id,
    });
  }
});

authorModel.virtual("id").get(function () {
  return this._id;
});

authorModel.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = model("Author", authorModel);
