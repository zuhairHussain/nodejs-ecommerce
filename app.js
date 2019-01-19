var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var routes = require("./routes/routes");
var config = require("./config");

var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url = config.dev_mongo_uri;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

module.exports = app;
