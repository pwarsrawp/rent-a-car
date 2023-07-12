const { Schema, model } = require("mongoose");

const branchSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const Branch = model("Branch", branchSchema);

module.exports = Branch;
