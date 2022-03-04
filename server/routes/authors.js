const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const authors = require("../controllers/authors");

router
  .route("/")
  .get(catchAsync(authors.getAllAuthors))
  .post(catchAsync(authors.createAuthor));

router
  .route("/:id")
  .get(catchAsync(authors.getAuthorById))
  .put(catchAsync(authors.updateAuthor))
  .delete(catchAsync(authors.deleteAuthor));

router.get("/by-book/:id", catchAsync(authors.getAuthorByBook));

module.exports = router;
