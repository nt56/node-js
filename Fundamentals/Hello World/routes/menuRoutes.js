const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

//POST method to add a MenuItem
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("Menu Data Saved Successfully");
    res.status(200).json(savedMenuItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//GET data according to taste
router.get("/:taste", async (req, res) => {
  try {
    //Extract the taste type from URL parameter
    const taste = req.params.taste;
    if (taste === "Spicy" || taste === "Sweet" || taste === "Sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid menu" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//GET method for get the MenuItem
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu Data Fetched Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//UPADTE the document
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; //extract id from URL parametr
    const updatedMenuData = req.body; //extract data of person

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, //return updated document
      runValidators: true, //run manoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "menu not found" });
    }

    console.log("mwnu data updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

//DELETE the document
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("menu data deleted successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

module.exports = router;
