const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      min: [6, "Password cannot exceed 6 characters"],
      select: false,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

let model = mongoose.model("User", userSchema);

module.exports = model;
