const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  picture: {
    type: String,
    required: true,
    min: 1,
  },
  birthdate: {
    type: String,
    required: true,
    min: 1,
  },
  phone: {
    type: String,
    required: true,
    min: 1,
  },
  email: {
    type: String,
    required: true,
    min: 1,
  },
  address: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model(
  "superadmin_info",
  userSchema,
  "superadmin_info"
);
