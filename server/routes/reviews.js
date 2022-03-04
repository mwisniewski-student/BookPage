const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const reviews = require("../controllers/reviews");

router.post("/", catchAsync(reviews.createReview));

router.delete("/:reviewId", catchAsync(reviews.deleteReview));

module.exports = router;
