const mongoose = require("mongoose");
const authors = require("./authors");
const books = require("./books");
const Book = require("../models/Book");
const Author = require("../models/Author");
require("dotenv").config();

const dbConnData = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_DATABASE,
};

const seedDb = async () => {
  await Author.deleteMany({});
  authors.forEach(async (author) => {
    const authorToSave = new Author(author);
    await authorToSave.save();
  });
  await Book.deleteMany({});
  books.forEach(async (book) => {
    const bookToSave = new Book(book);
    await bookToSave.save();
  });
};

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`
  )
  .then(async (response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    await seedDb();
    console.log("Data inserted");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
