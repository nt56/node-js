const express = require("express");
const router = express.Router();

const Person = require("./../models/person");

const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//POST method to add a person
router.post("/signup", async (req, res) => {
  try {
    //assuming the reqest body contains the person data
    const data = req.body;

    //cerate a new person document using the mongoose model and copyinf all data into it
    const newPerson = new Person(data);

    //save the new person to the database
    const savedPerson = await newPerson.save();
    console.log("Data Saved Successfully");

    const payload = {
      id: express.response.id,
      username: response.username,
    };

    const token = generateToken(payload);
    console.log(("Token is : ", token));

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//Login route
router.post("/signin", async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate Token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    // return token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET data accoeding to person  (parametrized call)
router.get("/:workType", async (req, res) => {
  try {
    //Extract the work type from URL parameter
    const workType = req.params.workType;
    if (
      workType === "Chef" ||
      workType === "Manager" ||
      workType === "Waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//GET method for get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//UPADTE the document
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract id from URL parametr
    const updatedPersonData = req.body; //extract data of person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return updated document
        runValidators: true, //run manoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//DELETE the document
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data deleted successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = router;
