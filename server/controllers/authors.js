const Author = require("../models/Author");
const Book = require("../models/Book");
const ExpressError = require("../utils/ExpressError");
const map_idToId = require("../utils/map_idToId");

module.exports.createAuthor = async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.send(map_idToId(author._doc));
};

module.exports.getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.send(authors.map((author) => map_idToId(author._doc)));
};

module.exports.getAuthorById = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.length !== 24) {
    throw new ExpressError("Wrong id given", 404);
  }
  const author = await Author.findById(id);
  if (!author) {
    throw new ExpressError("Author not found", 404);
  }
  res.send(map_idToId(author._doc));
};

module.exports.updateAuthor = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.send(map_idToId(author._doc));
};

module.exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;
  const authorDeleted = await Author.findByIdAndDelete(id);
  if (authorDeleted) {
    return res.send(authorDeleted);
  }
  throw new ExpressError("Author doesn't exist", 404);
};

module.exports.getAuthorByBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) throw new ExpressError("Book not found", 404);
  const authors = await Author.find().where("_id").in(book.authorsIds);
  if (!authors.length) {
    throw new ExpressError("No authors found", 404);
  }
  res.send(authors.map((author) => map_idToId(author._doc)));
};
