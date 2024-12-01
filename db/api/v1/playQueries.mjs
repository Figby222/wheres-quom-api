import pool from "../../pool.mjs";

async function createGamePost() {
    const game = await pool.game.create({
        data: {
            startTime: new Date(Date.now()).toISOString()
        }
    });

    return game;
}

async function changeGameStatePut(id, options) {
    const game = await pool.game.update({
        where: {
            id: id,
        },
        data: {
            ...options
        }
    })

    return game;
}


export default { createGamePost, changeGameStatePut };