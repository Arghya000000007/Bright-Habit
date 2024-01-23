const express = require("express");
const { getPost,getPostById,createPost,deletePost,updatePost } = require('./../Controllers/PostsController');
const PostRouter = express.Router();

PostRouter.route("/").get(getPost).post(createPost);
PostRouter.route("/:id").get(getPostById).put(updatePost).delete(deletePost);
module.exports = PostRouter;
