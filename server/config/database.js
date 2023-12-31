const mongoose = require("mongoose");
const { dataUser, dataProduct, dataProductStat,dataTransaction } = require("../data/index");
const User = require("../models/User");
const Product = require("../models/Product");
const ProductStat = require("../models/ProductStat");
const Transaction = require("../models/Transaction");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI || 5001, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB is connected to the host: ${con.connection.host} `);
      //only add data one time
      // User.insertMany();//dataUser
      // Product.insertMany();//dataProduct
      // ProductStat.insertMany();//dataProductStat
      // Transaction.insertMany();//dataTransaction
    });
};

module.exports = connectDatabase;
