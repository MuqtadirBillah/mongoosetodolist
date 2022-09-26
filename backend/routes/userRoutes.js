const express = require("express");
const userController = require("../controllers/userController")
const userRouter = express.Router();

userRouter.route("/all").get(userController.getUsers);

module.exports = userRouter;