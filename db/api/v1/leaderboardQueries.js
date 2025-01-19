const pool = require("../../pool.js");

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

module.exports = { getLeaderboard }