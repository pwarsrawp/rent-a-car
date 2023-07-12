const { Schema, model } = require("mongoose");

const branchSchema = new Schema(
  {
    Name: String,
  },
  {
    timestamps: true,
  }
);

const Branch = model("Branch", branchSchema);

module.exports = Branch;
