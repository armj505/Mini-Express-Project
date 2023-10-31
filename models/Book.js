const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  bookTitle: { type: String },
  bookAuthor: { type: String },
  bookPrice: { type: Number },
  bookImage: { type: String },
});

module.exports = model("Book", bookSchema);
