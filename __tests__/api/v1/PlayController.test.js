const router = require("../../../routers/api/v1/playRouter.js");

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
    test("Index route works", () => {
        request(app)
            .post("/")
            .expect(200)
            .then(async (res1) => {
                const request2 = await request(app)
                    .put("/")
                    .set("Authorization", res1.headers.authorization)
                    .set("Content-Type", "application/json")
                    .send(`
                        { 
                            characterId: ${targetBoxCoordinatePercentages.quom.id}, 
                            targetBoxXPercentage: ${targetBoxCoordinatePercentages.quom.xPercentage}, 
                            targetBoxYPercentage: ${targetBoxCoordinatePercentages.quom.yPercentage}
                        }
                    `)
                    .expect(200)
            })
    })
})
