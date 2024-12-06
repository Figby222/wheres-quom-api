const { Router } = require("express");
const v1Router = require("./v1/v1Router.js");

const indexRouter = Router();

indexRouter.use("/v1", v1Router);

module.exports = indexRouter;
