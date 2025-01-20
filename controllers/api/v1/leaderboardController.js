const db = require("../../../db/api/v1/leaderboardQueries.js");
const asyncHandler = require("express-async-handler");

const leaderboardGet = asyncHandler(async (req, res) => {
    const leaderboard = await db.getLeaderboard();

    res.status(200).json(leaderboard);
})

const leaderboardPost = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Hi", isTop10: true });
})

module.exports = { leaderboardGet, leaderboardPost };