const ExpressError = require("../utils/ExpressError");
const map_idToId = require("../utils/map_idToId");
const Book = require("../models/Book");
const Author = require("../models/Author");

module.exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(map_idToId(book._doc));
};

module.exports.getAllBooks = async (req, res) => {
  const books = await Book.find().populate("reviews");
  res.send(
    books.map((book) => {
      book._doc.reviews = book._doc.reviews.map((review) =>
        map_idToId(review._doc)
      );
      return map_idToId(book._doc);
    })
  );
};

module.exports.getBookById = async (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string" || id.length !== 24) {
    throw new ExpressError("Wrong id given", 404);
  }
  const book = await Book.findById(id).populate("reviews");
  if (!book) throw new ExpressError("Book not found", 404);
  book._doc.reviews = book._doc.reviews.map((review) =>
    map_idToId(review._doc)
  );
  res.send(map_idToId(book._doc));
};

module.exports.getBooksByAuthor = async (req, res) => {
  const { id } = req.params;
  const books = await Book.find({ authorsIds: id }).populate("reviews");
  res.send(
    books.map((book) => {
      book._doc.reviews = book._doc.reviews.map((review) =>
        map_idToId(review._doc)
      );
      return map_idToId(book._doc);
    })
  );
};

module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  }).populate("reviews");
  book._doc.reviews = book._doc.reviews.map((review) =>
    map_idToId(review._doc)
  );
  res.send(map_idToId(book._doc));
};

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id).populate("reviews");
  if (!book) {
    throw new ExpressError("Book doesn't exists", 404);
  }
  book._doc.reviews = book._doc.reviews.map((review) =>
    map_idToId(review._doc)
  );
  res.send(map_idToId(book._doc));
};
