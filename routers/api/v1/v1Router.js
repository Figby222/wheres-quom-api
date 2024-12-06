const { Router } = require("express");
const indexController = require("../../../controllers/api/v1/indexController.mjs");
const playRouter = require("./playRouter.mjs");

const indexRouter = Router();

indexRouter.use("/play", playRouter);

indexRouter.get("/", indexController.indexRouteGet);

module.exports = indexRouter;