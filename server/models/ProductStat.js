const mongoose = require("mongoose");

const productStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  {
    timestamps: true,
  }
);

let model = mongoose.model("ProductStat", productStatSchema);

module.exports = model;