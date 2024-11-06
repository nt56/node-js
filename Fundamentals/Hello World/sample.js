app.get("/veg", (req, res) => {
  res.send("what you want from veg menue");
});

app.get("/nonveg", (req, res) => {
  res.send("what you want from non-veg menue");
});

app.get("/egg", (req, res) => {
  let custom_egg = {
    name: "egg masala",
    is_rice: true,
    is_roti: true,
    price: 200,
  };
  res.send(custom_egg);
});
