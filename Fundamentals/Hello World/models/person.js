const mongoose = require("mongoose");

//create the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["Chef", "Waiter", "Manager"], //it will not accept other expect these three
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true, //email must be unique
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
});

//create person model and export
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
