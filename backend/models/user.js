const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
