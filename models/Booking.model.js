const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    startDate: {
      type: String,
      trim: true,
      required: false,
      unique: true,
    },
    endDate: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
