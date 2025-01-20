const db = require("../../../db/api/v1/leaderboardQueries.js");
const asyncHandler = require("express-async-handler");
const utils = require("./util.js");

const leaderboardGet = asyncHandler(async (req, res) => {
    const leaderboard = await db.getLeaderboard();

    res.status(200).json(leaderboard);
})

const leaderboardPut = [
    utils.handleJWTGameAuthorization,
    asyncHandler(async (req, res) => {
        const game = await db.addLeaderboardName(req.game.id, "quom");

        res.status(200).json({ message: "Hi", isTop10: true });
    })
]

module.exports = { leaderboardGet, leaderboardPut };