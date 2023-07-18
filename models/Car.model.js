const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    brand: String,
    model: String,
    gearbox: String,
    fuel: String,
    doors: Number,
    pax: Number,
    luggage: Number,
    img: String,
    ppd: Number,
  },
  {
    timestamps: true,
  }
);

const Car = model("Car", carSchema);

module.exports = Car;
