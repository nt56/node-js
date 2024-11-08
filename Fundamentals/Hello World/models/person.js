const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//securing the password
personSchema.pre("save", async (next) => {
  const person = this;

  // Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Override the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//create person model and export
const person = mongoose.model("Person", personSchema);
module.exports = person;
