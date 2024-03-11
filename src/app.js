const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const mongoose = require("mongoose");
const helmet = require("helmet");

// ---------------------------------------------- GENERAL SETTINGS -------------------------------

require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// ---------------------------------------------- DATABASE CONNECTION -------------------------------

mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
}

// ---------------------------------------------- ROUTES -------------------------------

app.get("/", (req, res) => {
  res.send("Hello!");
});

// ---------------------------------------------- ERROR HANDLER -------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

// ---------------------------------------------- SERVER LISTEN -------------------------------

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
