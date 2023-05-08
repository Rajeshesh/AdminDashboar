const getCountryIso3 = require("country-iso-2-to-3");
const Product = require("../models/Product");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const ProductStat = require("../models/ProductStat");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  const ProductWithStats = await Promise.all(
    products.map(async (product) => {
      const stat = await ProductStat.find({
        productId: product._id,
      });
      return { ...product._doc, stat };
    })
  );
  if (!ProductWithStats) {
    next(new ErrorHandler("productsWithStats not found", 401));
  }
  res.status(200).json(ProductWithStats);
});

exports.getCustomers = catchAsyncError(async (req, res, next) => {
  const customers = await User.find({ role: "user" }).select("-password");

  if (!customers) {
    next(new ErrorHandler("customers not found", 401));
  }
  res.status(200).json(customers);
});

exports.getTransactions = catchAsyncError(async (req, res, next) => {
  const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;

  const generatSort = () => {
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
    };
    return sortFormatted;
  };

  const sortFormatted = Boolean(sort) ? generatSort() : {};

  const transactions = await Transaction.find({
    $or: [
      { cost: { $regex: new RegExp(search, "i") } },
      { userId: { $regex: new RegExp(search, "i") } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  const total = await Transaction.countDocuments({
    userId: { $regex: search, $options: "i" },
  });

  if (!transactions) {
    next(new ErrorHandler("transactions not found", 401));
  }
  res.status(200).json({ transactions, total });
});

exports.getGeography = catchAsyncError(async (req, res, next) => {
  const users = await User.find().select("-password");
  const mappedLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryIso3(country);
    if (!acc.has(countryISO3)) {
      acc.set(countryISO3, 0);
    }
    return acc.set(countryISO3, acc.get(countryISO3) + 1);
  }, new Map());

  const mapArr = [];
  mappedLocations.forEach((val, key) => {
    mapArr.push({ id: key, value: val });
  });

  if (!mapArr) {
    next(new ErrorHandler("mapArr not found", 401));
  }
  res.status(200).json(mapArr);
});
