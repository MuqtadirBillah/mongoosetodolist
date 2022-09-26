const express = require("express");
const folderController = require("../controllers/folderController")
const folderRouter = express.Router();

folderRouter.route("/all").get(folderController.getFolders)
// .post(folderController.getFolderByUserId)
folderRouter.route("/create").post(folderController.createFolder)
folderRouter.route("/view/:id").get(folderController.viewFolder)
folderRouter.route("/delete/:id").get(folderController.deleteFolder)

module.exports = folderRouter;