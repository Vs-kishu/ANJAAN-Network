const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: String,
  userName: String,
  comments: [
    {
      body: String,
      userName: String,
      createdAt: String,
    },
  ],
  likes: [{ userName: String, createdAt: String }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: String,
});

module.exports = mongoose.model("Post", postSchema);
