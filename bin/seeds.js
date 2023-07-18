// bin/seeds.js

const mongoose = require("mongoose");
const Branch = require("../models/Branch.model");
const Car = require("../models/Car.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/rent-a-car";

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

const cars = [
  {
    brand: "FIAT",
    model: "500 EV",
    class: "Electric",
    gearbox: "Auto",
    fuel: "Electric",
    doors: "3",
    pax: "4",
    luggage: "1",
    img: "/images/fiat-500-ev.png",
    ppd: 48.23,
  },
  {
    brand: "Toyota",
    model: "AYGO",
    class: "MINI",
    gearbox: "Manual",
    fuel: "Gasoline",
    doors: "3",
    pax: "4",
    luggage: "1",
    img: "/images/toyota-aygo.png",
    ppd: 53.36,
  },
  {
    brand: "PEUGEOT",
    model: "2008",
    class: "COMPACT",
    gearbox: "Manual",
    fuel: "Gasoline",
    doors: "5",
    pax: "5",
    luggage: "2",
    img: "/images/peugeot-2008.png",
    ppd: 58.44,
  },
  {
    brand: "FORD",
    model: "MUSTANG EV",
    class: "Electric",
    gearbox: "Auto",
    fuel: "Electric",
    doors: "5",
    pax: "5",
    luggage: "2",
    img: "/images/ford-mustang-ev.png",
    ppd: 113.24,
  },
  {
    brand: "TESLA",
    model: "MODEL 3 EV",
    class: "Electric",
    gearbox: "Auto",
    fuel: "Electric",
    doors: "5",
    pax: "5",
    luggage: "3",
    img: "/images/tesla-model-3.png",
    ppd: 113.24,
  },
  {
    brand: "ABARTH",
    model: "500",
    class: "mini",
    gearbox: "Manual",
    fuel: "Gasoline",
    doors: "3",
    pax: "4",
    luggage: "1",
    img: "/images/abarth-500.png",
    ppd: 94.24,
  },
  {
    brand: "JEEP",
    model: "WRANGLER",
    class: "SUV",
    gearbox: "Manual",
    fuel: "Diesel",
    doors: "5",
    pax: "5",
    luggage: "4",
    img: "/images/jeep-wrangler.png",
    ppd: 362.49,
  },
  {
    brand: "SUZUKI",
    model: "JIMNY",
    class: "SUV",
    gearbox: "Manual",
    fuel: "Diesel",
    doors: "2",
    pax: "4",
    luggage: "2",
    img: "/images/suzuki-jimny.png",
    ppd: 362.49,
  },
  {
    brand: "TOYOTA",
    model: "LANDCRUISER",
    class: "SUV",
    gearbox: "Auto",
    fuel: "Diesel",
    doors: "5",
    pax: "7",
    luggage: "4",
    img: "/images/toyota-landcruiser.png",
    ppd: 362.49,
  },
];

Car.create(cars)
  .then((carsFromDB) => {
    console.log(`Created ${carsFromDB.length} cars`);
  })
  .catch((err) =>
    console.log(`An error occurred while creating books from the DB: ${err}`)
  );
  Branch.create(branches)
  .then((branchesFromDB) => {
    console.log(`Created ${branchesFromDB.length} branches`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating books from the DB: ${err}`)
  );
