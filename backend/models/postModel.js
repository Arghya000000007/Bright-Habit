const mongoose = require("mongoose");
const User = require("../models/userModel");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    title: {
      type: String,
      default: "Title",
    },
    description: {
      type: String,
      required: true,
      minLength: 8,
    },
    photo: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model('Post',PostSchema);

module.exports = Post;