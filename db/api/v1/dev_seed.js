const pool = require("../../pool.js");

async function seed() {
    await pool.character.deleteMany({});
    await pool.game.deleteMany({});

    const characters = await pool.character.createMany({
        data: [
            {
                id: 1,
                name: "quom",
                positionLeft: 16.40,
                positionTop: 83.86,
                positionRight: 17.60,
                positionBottom: 87.74,
            },
            {
                id: 2,
                name: "Comal",
                positionLeft: 75.10,
                positionTop: 75.27,
                positionRight: 76.76,
                positionBottom: 79.26,
            },
            {
                id: 3,
                name: "Figby",
                positionLeft: 47.27,
                positionTop: 39.33,
                positionRight: 48.26,
                positionBottom: 44.80
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