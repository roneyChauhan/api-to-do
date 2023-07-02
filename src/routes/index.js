const express = require("express");

const apiRouter = express.Router();
const authRouter = require("./auth/auth");
// const departmentRouter = require("./department/department");

apiRouter.use("/auth", authRouter);
// apiRouter.use("/department", departmentRouter);

module.exports = apiRouter;
