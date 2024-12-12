const pool = require("../../pool.js");

async function seed() {
    const characters = await pool.character.createMany({
        data: [
            {
                name: "quom",
                positionLeft: 4,
                positionTop: 8,
                positionRight: 8,
                positionBottom: 14,
            },
            {
                name: "Comal",
                positionLeft: 64,
                positionTop: 88,
                positionRight: 68,
                positionBottom: 94,
            },
            {
                name: "Figby",
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