const passport = require("../../../config/passport.js");
const asyncHandler = require("express-async-handler");

const handleJWTGameAuthorization = asyncHandler((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, game, info) => {
        if (err) {
            next(err);
            return;
        }

        if (!game) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }

        req.game = game;
        
        next();
    })(req, res, next);
})

const targetBoxCharacterCollision = (targetBoxXPercentage, targetBoxYPercentage, characterCoordinatePercentages) => {
    if (targetBoxXPercentage != characterCoordinatePercentages.left && targetBoxXPercentage != 64 && targetBoxXPercentage + 5 != characterCoordinatePercentages.left) {
        return false;
    }
    
    return true;
};

module.exports = { handleJWTGameAuthorization, targetBoxCharacterCollision };