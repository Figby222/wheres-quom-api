const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../../../db/api/v1/playQueries.js");
const utils = require("./util.js");
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

    jwt.sign({ id: gameInstance.id }, process.env.JWT_SECRET, function (err, token) {
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
        })
    })(req, res, next);
})

const changeGameStatePut = [
    utils.handleJWTGameAuthorization,
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

        
        const character = await db.getCharacterDetails(parseInt(req.body.characterId));

        const addFoundCharacterToGame = await db.addFoundCharacterToGame(req.game.id, req.body.characterId);

        if (req.body.characterId === 1) {
            utils.targetBoxCharacterCollision(4, 8, { top: 8, left: 4, right: 8, bottom: 14 });
            
        } else {
            utils.targetBoxCharacterCollision(64, 88, { top: 88, left: 64, right: 68, bottom: 94 });

        }



        const gameDetails = await db.getGameDetails(req.game.id);

        return res.status(200).json({
            success:true,
            characters: {
                ...gameDetails.charactersFound
            }
        })

    })
]

module.exports = { createGamePost, changeGameStatePut }