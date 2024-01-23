//Controllers
const express = require("express");
const PostRouter = express.Router();

const postController = require("../http/controllers/postController");
const AuthorizeRequest = require("../http/middlewares/auth");

PostRouter.route('/')
    .get(postController().getAllPost)
    .post(AuthorizeRequest,postController().createPost)

PostRouter.route('/:id')
    .get(postController().getPostById)
    .patch(AuthorizeRequest,postController().updatePost)
    .delete(AuthorizeRequest,postController().deletePost)

PostRouter.route('/category/:cat')
    .get(postController().getPostByCat);
// function InitRoutes(app) {
//     //GET Requests
//     app.get('/',postController().getAllPost);
//     app.get('/post/:id',postController().getPostById);
//     app.post('/post',postController().createPost);

//     //POST Requests
//     app.post('/register',AuthController().register);
//     app.post('/login',AuthController().login);
//     app.post('/logout',AuthController().logout);
// }
module.exports = PostRouter;