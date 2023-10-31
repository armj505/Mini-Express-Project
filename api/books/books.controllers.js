// Controller files: responsible for CRUD functions

// Import Schema from models folder
const Book = require("../../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getOneBook = async (req, res) => {
  try {
    const bookId = req.params["bookId"];
    const book = await Book.findById({ _id: bookId });
    if (!book) {
      return res.status(404).json("Book not Found");
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { bookTitle, bookAuthor, bookPrice } = req.body;
    let bookImage;
    if (req.file) {
      bookImage = req.file.path;
    }

    if (!bookTitle || !bookAuthor || !bookPrice || !bookImage) {
      return res.status(400).json("Missing book requirements");
    }
    const newBook = await Book.create({
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      bookPrice: bookPrice,
      bookImage: bookImage,
    });
    return res.status(201).json("Book Created!");
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    console.log(bookId);
    const foundBook = Book.findById(bookId);
    const { bookTitle, bookAuthor, bookPrice } = req.body;
    let bookImage;
    if (req.file) {
      bookImage = req.file.path;
    }

    if (foundBook) {
      await Book.findByIdAndUpdate(bookId, {
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookPrice: bookPrice,
        bookImage: bookImage,
      });
      return res.status(204).json(`Book ID: ${bookId} has been Updated`);
    }
    return res.status(404).json("This book does not exist");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const foundBook = await Book.findById({ _id: bookId });
    if (foundBook) {
      await Book.deleteOne(foundBook);
      return res.status(204).json(`Book deleted`);
    }
    return res.status(404).json("this book does not exist");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
