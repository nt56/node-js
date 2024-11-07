//this file is node/express server file
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./db"); //connecting db server to express server

const app = express();
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running on port:3000");
});
