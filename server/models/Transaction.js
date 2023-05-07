const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: { type: [mongoose.Types.ObjectId], of: Number },
  },
  {
    timestamps: true,
  }
);

let model = mongoose.model("Transaction", TransactionSchema);

module.exports = model;
