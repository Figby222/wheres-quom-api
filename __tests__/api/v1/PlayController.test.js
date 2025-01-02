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

    test("It is a function", () => {
        expect(typeof targetBoxCharacterCollision).toBe("function");
    })

    test("It returns true when targeting character", () => {
        const targetBoxXPercentage = 4;
        const targetBoxYPercentage = 14;
        const characterCoordinatePercentages = {
            top: 14,
            bottom: 19,
            left: 4,
            right: 8
        };

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage, 
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toEqual(true);
    })

    test("It returns false when incorrectly targeting a character", () => {
        const targetBoxXPercentage = 33;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 14,
            bottom: 19,
            left: 4,
            right: 8
        };

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toEqual(false);
    })

    test("It returns true when correctly targeting the character", () => {
        const targetBoxXPercentage = 33;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: 33,
            right: 37
        };

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })

    test("It returns false when Y is correct but X isn't", () => {
        const targetBoxXPercentage = 33;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: 46,
            right: 50
        };

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns true when targeting a different character", () => {
        const targetBoxXPercentage = 64;
        const targetBoxYPercentage = 86;
        const characterCoordinatePercentages = {
            top: 95,
            bottom: 99,
            left: 68,
            right: 74
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toEqual(true);
    })

    test("It returns true when X is 5 pixel percentages away from character", () => {
        const targetBoxXPercentage = 28;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage + 5,
            right: 37
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })

    test("It returns true when X is 10 pixel percentages away from character", () => {
        const targetBoxXPercentage = 24;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage + 10,
            right: 37
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })

    test("It returns false when X is 11 pixel percentages away from character", () => {
        const targetBoxXPercentage = 23;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage + 11,
            right: 37
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns true when targetBox only partially covers the character horizontally", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage - 1,
            right: 37
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })

    test("It returns false when X is 12 pixel percentages away from character", () => {
        const targetBoxXPercentage = 22;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage + 12,
            right: 37 
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns true targetBox further only partially covers the character horizontally", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage - 3,
            right: targetBoxXPercentage + 1
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })

    test("It returns true if targetBox furthest only partially covers the character horizontally", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage - 4,
            right: targetBoxXPercentage
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })

    test("It returns true if targetBox is partially covering a wider character horizontally", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage - 6,
            right: targetBoxXPercentage + 4
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(true);
    })



    test("It returns false if targetBox isn't partially covering a skinnier character horizontally", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 32;
        const characterCoordinatePercentages = {
            top: 33,
            bottom: 38,
            left: targetBoxXPercentage - 4,
            right: targetBoxYPercentage - 2
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns false if targetBox X is correct and Y is 12 pixels down", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 30;
        const characterCoordinatePercentages = {
            top: targetBoxYPercentage + 12,
            bottom: 53,
            left: targetBoxXPercentage,
            right: targetBoxXPercentage + 4
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns false if targetBox X is correct and a different Y is 11 pixels down", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 36;
        const characterCoordinatePercentages = {
            top: targetBoxYPercentage + 11,
            bottom: 57,
            left: targetBoxXPercentage,
            right: targetBoxXPercentage + 4
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns false if targetBox X is correct and a different Y is 14 pixels down", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 24;
        const characterCoordinatePercentages = {
            top: targetBoxYPercentage + 14,
            bottom: 48,
            left: targetBoxXPercentage,
            right: targetBoxXPercentage + 4
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns false when character is above targetBox", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 34;
        const characterCoordinatePercentages = {
            top: targetBoxYPercentage - 15,
            bottom: 29,
            left: targetBoxXPercentage,
            right: targetBoxXPercentage + 4
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })

    test("It returns false when character is above targetBox when targetBox has a different Y Coordinate", () => {
        const targetBoxXPercentage = 34;
        const targetBoxYPercentage = 24;
        const characterCoordinatePercentages = {
            top: targetBoxYPercentage - 15,
            bottom: 19,
            left: targetBoxXPercentage,
            right: targetBoxXPercentage + 4
        }

        expect(targetBoxCharacterCollision(
            targetBoxXPercentage,
            targetBoxYPercentage,
            characterCoordinatePercentages
        )).toBe(false);
    })
})

