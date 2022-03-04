const express = require("express");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const books = require("../controllers/books");

router
  .route("/")
  .post(catchAsync(books.createBook))
  .get(catchAsync(books.getAllBooks));

router
  .route("/:id")
  .get(books.getBookById)
  .put(catchAsync(books.updateBook))
  .delete(catchAsync(books.deleteBook));

router.get("/by-author/:id", catchAsync(books.getBooksByAuthor));

module.exports = router;
