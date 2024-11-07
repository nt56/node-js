//this file is db server file
const mongoose = require("mongoose"); //import
require("dotenv").config();

// const mongoURL = process.env.DB_URL_LOCAL; //local db connection url
const mongoURL = process.env.DB_URL; //online db connection url

//set up connection
mongoose.connect(mongoURL);

//mogoose maintain a default connection object representing the mongoDB connection
const db = mongoose.connection;

//define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to mongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB Connection error : ", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

//export the DB
module.exports = db;
