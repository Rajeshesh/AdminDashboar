const Product = require("../models/Product");
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
