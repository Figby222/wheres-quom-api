import pool from "../../pool.mjs";

async function createGamePost() {
    const game = await pool.game.create({
        data: {
            startTime: new Date(Date.now()).toISOString()
        }
    });

    return game;
}


export default { createGamePost };