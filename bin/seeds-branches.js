const mongoose = require("mongoose");
const Branch = require("../models/Branch.model");
const Car = require("../models/Car.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/rent-a-car";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const branches = [
  {
    name: "Athens",
  },
  {
    name: "Berlin",
  },
  {
    name: "Copenhagen",
  },
  {
    name: "Dublin",
  },
  {
    name: "Helsinki",
  },
  {
    name: "London",
  },
  {
    name: "Madrid",
  },
  {
    name: "Oslo",
  },
  {
    name: "Paris",
  },
  {
    name: "Rome",
  },
  {
    name: "Stockholm",
  },
  {
    name: "Vienna",
  },
];

Branch.create(branches)
  .then((branchesFromDB) => {
    console.log(`Created ${branchesFromDB.length} branches`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating branches from the DB: ${err}`)
  );
