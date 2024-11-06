const mongoose = require("mongoose");

const menuItemschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["Sweet", "Spicy", "Sour"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false, //if no value then it false
  },
  ingredients: {
    type: [String],
    default: [],
  },
  sales: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemschema);
module.exports = MenuItem;
