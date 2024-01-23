const express = require('express');
const userController = require("./../http/controllers/userController");
const AuthorizeRequest = require("./../http/middlewares/auth");
const UserRouter = express.Router();

UserRouter.get('/me',AuthorizeRequest,userController.getMyDetails);
UserRouter.post('/me',AuthorizeRequest,userController.updateMyDetails);
UserRouter.patch('/update-password',AuthorizeRequest,userController.updatePassword);

module.exports = UserRouter;