const pool = require("../../pool.js");

const getCharactersDetails = async () => {
    const characters = await pool.character.findMany({
        select: {
            id: true,
            name: true
        }
    })

    return characters;
}

module.exports = { getCharactersDetails }