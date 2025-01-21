const db = require("../../../db/api/v1/leaderboardQueries.js");
const asyncHandler = require("express-async-handler");
const utils = require("./util.js");
const { body, validationResult } = require("express-validator");

const validatePut = [
    body("username")
        .toString()
        .length({ min: 5, max: 14 })
]

const leaderboardGet = asyncHandler(async (req, res) => {
    const leaderboard = await db.getLeaderboard();

    res.status(200).json(leaderboard);
})

const leaderboardPut = [
    validatePut,
    utils.handleJWTGameAuthorization,
    asyncHandler(async (req, res) => {
        const errorsResult = validationResult(req);
        if (!errorsResult.isEmpty()) {
            return res.status(400).json({
                errors: {
                    ...errorsResult.errors
                }
            })
        }
        const game = await db.addLeaderboardName(req.game.id, req.body.username);

        res.status(200).json({ message: "Hi", isTop10: true });
    })
]

module.exports = { leaderboardGet, leaderboardPut };