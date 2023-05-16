const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    max: 500,
  },
  time: {
    type: String,
    required: true,
    min: 1,
  },
  activities: {
    type: String,
    required: true,
    min: 1,
  },
  usertype: {
    type: String,
    required: true,
    min: 1,
  },
  year: {
    type: String,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("activity_log", userSchema, "activity_log");
