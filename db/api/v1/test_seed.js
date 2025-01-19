const pool = require("../../pool.js");

const ONE_SECOND_IN_MILLISECONDS = 1000;

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

    const game = await pool.game.createMany({
        data: [
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 10
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 20
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 30
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 40
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 50
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 60
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 70
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 80
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 90
            },
            {
                startTime: Date.now(),
                endTime: Date.now() + ONE_SECOND_IN_MILLISECONDS * 100
            },

        ]
    })
}

seed();