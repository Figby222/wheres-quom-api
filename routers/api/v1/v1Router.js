const { Router } = require("express");
const indexController = require("../../../controllers/api/v1/indexController.js");
const playRouter = require("./playRouter.js");

const indexRouter = Router();

indexRouter.use("/play", playRouter);

indexRouter.get("/", indexController.indexRouteGet);

module.exports = indexRouter;