const { MongoClient } = require("mongodb");

// Connection URL
const url =
  "mongodb+srv://nagutirth2121:qpKh3DDJE7o64njP@namastenode.f70ad.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWorld";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  // Inserting the documents
  const data = {
    firstname: "abc",
    lastname: "xyz",
    city: "moon",
    phoneNumber: "000000000",
  };
  const insertResult = await collection.insertOne(data);
  console.log("Inserted documents =>", insertResult);

  //reading the document
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  //Update the document
  const updateResult = await collection.updateOne(
    { firstname: "abc" },
    { $set: { lastname: "tirth" } }
  );
  console.log("Updated documents =>", updateResult);

  //delete the document
  const deleteResult = await collection.deleteOne({ firstname: "abc" });
  console.log("Deleted document =>", deleteResult);

  //count
  const countResult = await collection.countDocuments({});
  console.log("Count of documents in the User collection =>", countResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// Go to mongodb website
// Create a free M0 cluster
// Create a user
// Get the connection string
// Install Mongo DB compass
// Create a database
// INstall mongodb package
// Create a connection from code
// Documents CRUD - CReate, REad, Update, Delete
