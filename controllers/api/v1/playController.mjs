import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import db from "../../../db/api/v1/playQueries.mjs";
import "dotenv/config";

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

export { createGamePost }a