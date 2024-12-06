const pool = require("../../pool.js");

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


module.exports = { createGamePost, changeGameStatePut };