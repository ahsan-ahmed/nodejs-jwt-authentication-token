const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserAuthSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserAuth = mongoose.model("userauth", UserAuthSchema);

