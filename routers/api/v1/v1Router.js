const { Router } = require("express");
const indexController = require("../../../controllers/api/v1/indexController.js");
const playRouter = require("./playRouter.js");
const leaderboardRouter = require("./leaderboardRouter.js");

const indexRouter = Router();

indexRouter.use("/play", playRouter);
indexRouter.use("/leaderboard", leaderboardRouter);

indexRouter.get("/", indexController.indexRouteGet);

module.exports = indexRouter;