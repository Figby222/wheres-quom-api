const { Router } = require(express);
const leaderboardController = require("../../../controllers/api/v1/leaderboardController.js");

const leaderboardRouter = Router();

leaderboardRouter.get("/", leaderboardController.leaderboardGet);

module.exports = leaderboardRouter;