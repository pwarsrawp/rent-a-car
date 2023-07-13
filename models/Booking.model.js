const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    car: {
      type: String,
    },
    branch: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
