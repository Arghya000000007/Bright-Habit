const express = require('express');
const AuthRouter = express.Router();

const AuthController = require('../http/controllers/authController');

AuthRouter.post('/login',AuthController().login);
AuthRouter.post('/register',AuthController().register);
AuthRouter.post('/logout',AuthController().logout);

module.exports = AuthRouter;
