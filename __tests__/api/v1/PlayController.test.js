const router = require("../../../routers/api/v1/playRouter.js");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

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
})
