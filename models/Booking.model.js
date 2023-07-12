const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookingSchema = new Schema(
  {
    startDate: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    endDate: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Booking = model("Booking", bookingSchema);

module.exports = Booking;