const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const db = require("../../../db/api/v1/playQueries.js");
const utils = require("./util.js");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

const characterDb = require("../../../db/api/v1/characterQueries.js");

const changeGameStatePutValidator = [
    body("characterId")
        .toInt()
        .notEmpty(),
    body("targetBoxXPercentage")
        .toFloat()
        .notEmpty()
        .isFloat({ min: 0, max: 100 }),
    body("targetBoxYPercentage")
        .toFloat()
        .notEmpty()
        .isFloat({ min: 0, max: 100 })
]

const createGamePost = asyncHandler(async (req, res, next) => {
    const gameInstance = await db.createGamePost();

    jwt.sign({ id: gameInstance.id }, process.env.JWT_SECRET, async function (err, token) {
        if(err) {
            next(err);
            return;
        }

        const imageSrc = `${process.env.WEBSITE_URL}/levels/01/wheres-quom.webp`;
        const charactersDetails = await characterDb.getCharactersDetails();

        res.setHeader("Authorization", `Bearer ${token}`);
        res.setHeader("Access-Control-Expose-Headers", `Authorization`)

        res.json({
            characters: charactersDetails,
            imageSrc: imageSrc,
            token: token,
        })
    });
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

        const success = utils.targetBoxCharacterCollision(
            req.body.targetBoxXPercentage,
            req.body.targetBoxYPercentage,
            {
                top: character.positionTop,
                left: character.positionLeft,
                right: character.positionRight,
                bottom: character.positionBottom
            }
        )



        const gameDetails = await db.getGameDetails(req.game.id);

        const playerHasWon = gameDetails.charactersFound.length === 3;

        let completionTime = null;

        if (playerHasWon) {
            const endTime = BigInt(Date.now());
            
            const { startTime } = gameDetails;
    
            completionTime = endTime - startTime;
    
            await db.addEndTimeToGame(req.game.id, endTime);
            
        }
        

        return res.status(200).json({
            success:success,
            characters: {
                ...gameDetails.charactersFound
            },
            playerHasWon: playerHasWon,
            completionTime: completionTime
        })

    })
]

module.exports = { createGamePost, changeGameStatePut }