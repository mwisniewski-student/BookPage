const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: {
    type: Number,
    required: [true, "rating is required"],
    min: [1, "rating must be greater or equal to 1."],
    max: [5, "rating must be less or equal to 5."],
  },
});

reviewSchema.virtual("id").get(function () {
  return this._id;
});

reviewSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Review", reviewSchema);
