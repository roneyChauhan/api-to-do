const express = require("express");

const apiRouter = express.Router();
const authRouter = require("./auth/auth");
const taskRouter = require("./task/task");
const auth = require("../middleware/auth");

apiRouter.use("/auth", authRouter);
apiRouter.use("/task", auth, taskRouter);

module.exports = apiRouter;
