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
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 10).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 20).toISOString() 
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 30).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 40).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 50).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 60).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 70).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 80).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 90).toISOString()
            },
            {
                startTime: new Date(Date.now()).toISOString(),
                endTime: new Date(Date.now() + ONE_SECOND_IN_MILLISECONDS * 100).toISOString()
            },

        ]
    })
}

seed();