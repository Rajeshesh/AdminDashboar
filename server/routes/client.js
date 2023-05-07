const express = require("express");
const {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} = require("../controllers/client");
const router = express.Router();
router.route("/products").get(getProducts);
router.route("/customers").get(getCustomers);
router.route("/transactions").get(getTransactions);
router.route("/geography").get(getGeography);

module.exports = router;
