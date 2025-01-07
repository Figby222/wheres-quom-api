const pool = require("../../pool.js");

async function seed() {
    await pool.character.deleteMany({});
    await pool.game.deleteMany({});
    const characters = await pool.character.createMany({
        data: [
            {
                name: "quom",
                id: 1,
                positionLeft: 4,
                positionTop: 8,
                positionRight: 8,
                positionBottom: 14,
            },
            {
                name: "Comal",
                id: 2,
                positionLeft: 64,
                positionTop: 88,
                positionRight: 68,
                positionBottom: 94,
            },
            {
                name: "Figby",
                id: 3,
                positionLeft: 86,
                positionTop: 46,
                positionRight: 90,
                positionBottom: 53
            }
        ]
    })

    const game = await pool.game.create({
        data: {
            startTime: new Date(Date.now()).toISOString()
        }
    })
}

seed();