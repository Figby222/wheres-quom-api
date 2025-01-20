const pool = require("../../pool.js");

BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
}

const getLeaderboard = async () => {
    const leaderboard = await pool.$queryRaw`
        SELECT *, "endTime" - "startTime" AS "completionTime" 
        FROM "Game"
        WHERE "endTime" - "startTime" IS NOT NULL
        ORDER BY "completionTime"
        LIMIT 10
    `;

    return leaderboard;
}

const addLeaderboardName = async (gameId, playerName) => {
    const game = await pool.game.update({
        where: {
            id: gameId,
        },
        data: {
            playerName: playerName
        }
    })

    return game;
}

module.exports = { getLeaderboard, addLeaderboardName }