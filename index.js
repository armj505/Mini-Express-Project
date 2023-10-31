// Setup express and mount the database to the app (database.js)
const express = require("express");
const mongoDB = require("./database");
const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("dev"));

const errorHandler = (error, req, res, next) => {
  // Error handling middleware functionality
  console.log(`error ${error.message}`);
  const status = error.status || 500;
  // send back an easily understandable error message to the caller
  res.status(status).send(error.message);
};

// app.use((req, res, next) => {
//   console.log(
//     "Time:",
//     new Intl.DateTimeFormat("en-GB", {
//       dateStyle: "short",
//       timeStyle: "short",
//       timeZone: "Asia/Kuwait",
//     }).format(Date.now())
//   );
//   next();
// });

// Setup Routes
const booksRoute = require("./api/books/books.routes");
app.use("/books", booksRoute);

app.get("*", function (req, res) {
  res.status(404).send("what???");
});
app.use(errorHandler);
mongoDB();

app.listen(port, () => {
  console.log("Server is listening to port " + port);
});
