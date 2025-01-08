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



module.exports = { createGamePost, changeGameStatePut, getCharacterDetails, addFoundCharacterToGame };