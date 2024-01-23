const Post = require("../../models/postModel");

function postController() {
  return {
    async getAllPost(req, res) {
      try {
        const post = await Post.find();
        return res.json({
          status: "success",
          data: {
            post,
          },
        });
      } catch (err) {
        return res.json({
          status: "error",
          message: "Something went wrong",
        });
      }
    },
    async getPostById(req, res) {
      try {
        const post = await Post.findById(req.params.id).populate({
          path: "userId",
          select: "-password -email"
        });
        return res.json({
          status: "success",
          post
        });
      } catch (error) {
        return res.json({
          status: "error",
          message: "Something went wrong",
        });
      }
    },
    async createPost(req, res) {
      try {
        const { title, description, category } = req.body;
        await Post.create({
          title: title,
          description: description,
          category: category,
          userId: req.user._id
        });
        // const data = new Post({
        //   title: title,
        //   description: description,
        //   // photo: photo,
        //   category: category,
        //   userId: req.user._id
        // });
        // await data.save();
        return res.json({
          status: "success",
          mesasge:"Post Created Successfully"
        });
      } catch (error) {
        return res.json({
          status: "error",
          message: error.message,
        });
      }
    },
    async updatePost(req, res) {
      try {
        const post = await Post.findByIdAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
          }
        );
        return res.json({
          status: "success",
          data: {
            post,
          },
        });
      } catch (error) {
        return res.json({
          status: "error",
          message: "Something went wrong",
        });
      }
    },
    async deletePost(req, res) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        return res.json({
          status: "success",
          data: null,
        });
      } catch (error) {
        return res.json({
          status: "error",
          message: "Something went wrong",
        });
      }
    },
    async getPostByCat(req, res) {
      const cat = req.params.cat;
      try {
        const posts = await Post.find({ category: cat });
        return res.json({
          status: "success",
          posts
        });
      } catch (error) {
        return res.json({
          status: "error",
          message: error.message,
        });
      }
    },
  };
}

module.exports = postController;
