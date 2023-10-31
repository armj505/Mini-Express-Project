// Handle rou
const express = require("express");
const upload = require("../../middleware/upload");
const {
  getBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
} = require("./books.controllers");
const router = express.Router();

router.get("/", getBooks);
router.get("/:bookId", getOneBook);
router.post("/", upload.single("bookImage"), createBook);
router.put("/:bookId", upload.single("bookImage"), updateBook);
router.delete("/:bookId", deleteBook);


module.exports = router;
