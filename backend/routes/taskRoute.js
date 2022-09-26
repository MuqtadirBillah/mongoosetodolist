const express = require("express");
const taskController = require("../controllers/taskController")
const taskRouter = express.Router();

taskRouter.route("/create").post(taskController.createTask)
taskRouter.route("/view/:id").get(taskController.getTasks)
taskRouter.route("/delete/:id").get(taskController.deleteTask)

module.exports = taskRouter;