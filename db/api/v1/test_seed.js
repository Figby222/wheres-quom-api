const pool = require("../../pool.js");

async function seed() {
    const characters = await pool.character.createMany({
        data: [
            {
                name: "quom",
                positionX: 4,
                positionY: 8,
                positionX2: 8,
                positionY2: 14,
            },
            {
                name: "Comal",
                positionX: 64,
                positionY: 88,
                positionX2: 68,
                positionY2: 94,
            },
            {
                name: "Figby",
                positionX: 86,
                positionY: 46,
                positionX2: 90,
                positionY2: 53
            }
        ]
    })

    const game = await pool.game.create({
        startTime: new Date(Date.now()).toISOString()
    })
}

seed();