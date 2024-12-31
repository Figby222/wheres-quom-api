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
    if ((targetBoxXPercentage > characterCoordinatePercentages.left + 4 || targetBoxXPercentage + 10 < characterCoordinatePercentages.left) || (targetBoxXPercentage > characterCoordinatePercentages.left && targetBoxXPercentage > characterCoordinatePercentages.left + 4)) {
        return false;
    }
    
    return true;
};

module.exports = { handleJWTGameAuthorization, targetBoxCharacterCollision };