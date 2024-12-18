const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../../../db/api/v1/playQueries.js");
const { handleJWTGameAuthorization } = require("./util.js");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

const changeGameStatePutValidator = [
    body("characterId")
        .toInt()
        .notEmpty(),
    body("targetBoxXPercentage")
        .toInt()
        .notEmpty(),
    body("targetBoxYPercentage")
        .toInt()
        .notEmpty()
]

const createGamePost = asyncHandler(async (req, res, next) => {
    const gameInstance = await db.createGamePost();

    jwt.sign({ id: gameInstance.id }, process.env.JWT_SECRET, function (err, token) {a
        if(err) {
            next(err);
            return;
        }

        const imageSrc = `${process.env.WEBSITE_URL}/public/levels/01/wheres-quom.webp`

        res.setHeader("Authorization", `Bearer ${token}`);
        res.setHeader("Access-Control-Expose-Headers", `Authorization`)

        res.json({
            imageSrc: imageSrc,
            token: token
        })a
    })(req, res, next);
})

const changeGameStatePut = [
    handleJWTGameAuthorization,
    changeGameStatePutValidator,
    asyncHandler(async (req, res, next) => {
        const errorsResult = validationResult(req);

        if(!errorsResult.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: {
                    ...errorsResult.errors
                }

            })
        }

        res.status(200).json({
            message: "Successfully Updated Game State"
        })
    })
]

module.exports = { createGamePost, changeGameStatePut }