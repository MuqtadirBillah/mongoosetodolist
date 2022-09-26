const express = require("express");
const authController = require("../controllers/authController")
const authRouter = express.Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);
authRouter.route("/send-code").post(authController.sendCode);
authRouter.route("/reset-password").post(authController.resetPassword);

module.exports = authRouter;