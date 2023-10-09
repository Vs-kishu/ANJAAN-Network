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
  savedPosts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  token: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
