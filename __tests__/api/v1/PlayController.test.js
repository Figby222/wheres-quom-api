const router = require("../../../routers/api/v1/playRouter.js");
const { targetBoxCharacterCollision } = require("../../../controllers/api/v1/util.js");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

const targetBoxCoordinatePercentages = {
    quom: {
        id: 1,
        xPercentage: 4,
        yPercentage: 8
    },
    comal: {
        id: 2,
        xPercentage: 64,
        yPercentage: 88
    },
    figby: {
        id: 3,
        xPercentage: 86,
        yPercentage: 46
    }
}

describe("Index route POST", () => {
    test("Index route works", (done) => {
        request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200, done);
    })
    
    test("It sends auth token", (done) => {
        request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                if (!res.headers.authorization) {
                    return done(`res.headers.authorization is undefined`);
                }

                done();
            });
    })

    test("It sends different bearer token each time", (done) => {
        const request1 = request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(async (res1) => {
                const request2 = await request(app)
                    .post("/")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((res2) => {
                        if (res1.headers.authorization === res2.headers.authorization) {
                            return done("res1.headers.authorization is equal to res2.headers.authorization")
                        }

                        return done();
                    })
            })
    })
})

describe("Index route PUT", () => {
    test("Index route works", (done) => {
        request(app)
            .post("/")
            .expect(200)
            .then((res1) => {
                const request2 = request(app)
                    .put("/")
                    .set("Authorization", res1.headers.authorization)
                    .type("form")
                    .send(
                        { 
                            characterId: targetBoxCoordinatePercentages.quom.id, 
                            targetBoxXPercentage: targetBoxCoordinatePercentages.quom.xPercentage, 
                            targetBoxYPercentage: targetBoxCoordinatePercentages.quom.yPercentage
                        }
                    )
                    .expect(200, done)
            })
    })

    test("Index route doesn't work without authorization", (done) => {
        request(app)
            .put("/")
            .type("form")
            .send(`
                {
                            characterId: ${targetBoxCoordinatePercentages.quom.id}, 
                            targetBoxXPercentage: ${targetBoxCoordinatePercentages.quom.xPercentage}, 
                            targetBoxYPercentage: ${targetBoxCoordinatePercentages.quom.yPercentage}
                }
            `)
            .expect(401, done);
    })

    test("Index route sends 400 status when JSON data is missing", async () => {
        const res1 = await request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200);
        
        const res2 = await request(app)
            .put("/")
            .type("form")
            .set("Authorization", res1.headers.authorization)
            .send(``)
            .expect(400)
    })

    test("Index route sends 400 status when JSON data is incomplete", async () => {
        const res1 = await request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200);
        
        const res2 = await request(app)
            .put("/")
            .type("form")
            .set("Authorization", res1.headers.authorization)
            .send(
                { 
                    targetBoxXPercentage: targetBoxCoordinatePercentages.quom.xPercentage, 
                    targetBoxYPercentage: targetBoxCoordinatePercentages.quom.yPercentage
                }
            )
            .expect(400)
        
            const res3 = await request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200);
        
            const res4 = await request(app)
                .put("/")
                .type("form")
                .set("Authorization", res3.headers.authorization)
                .send(
                    { 
                        characterId: targetBoxCoordinatePercentages.quom.id,
                        targetBoxXPercentage: targetBoxCoordinatePercentages.quom.xPercentage
                    }
                )
                .expect(400)

            const res5 = await request(app)
                .post("/")
                .expect("Content-Type", /json/)
                .expect(200);
        
            const res6 = await request(app)
                .put("/")
                .type("form")
                .set("Authorization", res3.headers.authorization)
                .send(
                    { 
                        characterId: targetBoxCoordinatePercentages.quom.id, 
                        targetBoxXPercentage: targetBoxCoordinatePercentages.quom.xPercentage 
                    }
                )
                .expect(400)
    })

    test("Index route returns success message when user correctly targets a character", async () => {
        const res1 = await request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200);
        
        const res2 = await request(app)
            .put("/")
            .type("form")
            .set("Authorization", res1.headers.authorization)
            .send(
                {
                    characterId: targetBoxCoordinatePercentages.quom.id, 
                    targetBoxXPercentage: targetBoxCoordinatePercentages.quom.xPercentage, 
                    targetBoxYPercentage: targetBoxCoordinatePercentages.quom.yPercentage
                }
            )
            .expect(200)

            expect(res2.body.success).toEqual(true)
            expect(res2.body.character.id).toEqual(1)
            expect(res2.body.character.positionLeft).toEqual(4)
            expect(res2.body.character.positionTop).toEqual(8)
            expect(res2.body.character.positionRight).toEqual(8)
            expect(res2.body.character.positionBottom).toEqual(14)
    })

    test("Index route returns success message when user targets a different character", async () => {
        const res1 = await request(app)
            .post("/")
            .expect("Content-Type", /json/)
            .expect(200)

        const res2 = await request(app)
            .put("/")
            .type("form")
            .set("Authorization", res1.headers.authorization)
            .send(
                {
                    characterId: targetBoxCoordinatePercentages.comal.id, 
                    targetBoxXPercentage: targetBoxCoordinatePercentages.comal.xPercentage, 
                    targetBoxYPercentage: targetBoxCoordinatePercentages.comal.yPercentage
                }
            )
            .expect(200)
        
        expect(res2.body.success).toEqual(true)
        expect(res2.body.character.id).toEqual(2)
        expect(res2.body.character.positionLeft).toEqual(64)
        expect(res2.body.character.positionTop).toEqual(88)
        expect(res2.body.character.positionRight).toEqual(68)
        expect(res2.body.character.positionBottom).toEqual(94)
    })
})

describe("targetBoxCharacterCollision", () => {
    test("It exists", () => {
        expect(targetBoxCharacterCollision).toBeDefined();
    })
})

