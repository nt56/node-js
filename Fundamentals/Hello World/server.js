//this file is node/express server file
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const db = require("./db"); //connecting db server to express server
const passport = require("./auth");
require("dotenv").config();

//sample middleware function
const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest); //it apply to all functionalities

app.use(passport.initialize()); //initialize
const localAuthMiddleware = passport.authenticate("local", { session: false }); //authentication

//get the hotel info
app.get("/", (req, res) => {
  res.send("Hello....welcome to the hotel");
});

//Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

//Use the Router
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("server running on port:3000");
});
