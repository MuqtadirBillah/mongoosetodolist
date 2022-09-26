// const expressRouter = require("express").Router;
const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);

//users routes
const userRouter = require("./userRoutes");
router.use("/user", userRouter);

//folder routes
const folderRouter = require("./folderRoutes");
router.use("/folder", folderRouter);

//task routes
const taskRouter = require("./taskRoute");
router.use("/task", taskRouter);

module.exports = router;