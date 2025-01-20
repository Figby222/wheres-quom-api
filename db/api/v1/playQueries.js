const pool = require("../../pool.js");

async function createGamePost() {
    const game = await pool.game.create({
        data: {
            startTime: Date.now()
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

async function getCharacterDetails(id) {
    const character = await pool.character.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            positionTop: true,
            positionLeft: true,
            positionRight: true,
            positionBottom: true,
        }
    });
    

    return character;
}

async function addFoundCharacterToGame(gameId, characterId) {
    const game = await pool.game.update({
        where: {
            id: gameId,
        },
        data: {
            charactersFound:{
                connect: {
                    id: characterId
                }
            }
        }
    })

    return game;
}

async function getGameDetails(gameId) {
    const game = await pool.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            charactersFound: true
        }
    })

    return game;
}

async function addEndTimeToGame(gameId, endTime) {
    const game = await pool.game.update({
        where: {
            id: gameId,
        },
        data: {
            endTime: endTime
        }
    })
}



module.exports = { createGamePost, changeGameStatePut, getCharacterDetails, addFoundCharacterToGame, getGameDetails, addEndTimeToGame };