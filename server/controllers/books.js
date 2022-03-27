const ExpressError = require("../utils/ExpressError");
const Book = require("../models/Book");

module.exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
};

module.exports.getAllBooks = async (req, res) => {
  const books = await Book.find().populate("reviews");
  res.send(books);
};

module.exports.getBookById = async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate("reviews");
  if (!book) throw new ExpressError("Book not found", 404);
  res.send(book);
};

module.exports.getBooksByAuthor = async (req, res) => {
  const { id } = req.params;
  const books = await Book.find({ authorsIds: id }).populate("reviews");
  res.send(books);
};

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  }).populate("reviews");
  res.send(book);
};

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id).populate("reviews");
  if (!book) {
    throw new ExpressError("Book doesn't exists", 404);
  }
  res.send(book);
};
