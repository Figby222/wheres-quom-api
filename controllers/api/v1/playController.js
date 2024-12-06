const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../../../db/api/v1/playQueries.js");
const { handleJWTGameAuthorization } = require("./util.js");
require("dotenv").config();

const createGamePost = asyncHandler(async (req, res, next) => {
    const gameInstance = await db.createGamePost();

    jwt.sign({ id: gameInstance.id }, process.env.JWT_SECRET, function (err, token) {
        if(err) {
            next(err);
            return;
        }

        const imageSrc = `${process.env.WEBSITE_URL}/public/levels/01/wheres-quom.webp`

        res.json({
            imageSrc: imageSrc,
            token: token
        })
    })
})

const changeGameStatePut = [
    handleJWTGameAuthorization,
    asyncHandler(async (req, res, next) => {
        res.status(200).json({
            message: "Successfully Updated Game State"
        })
    })
]

module.exports = { createGamePost, changeGameStatePut }