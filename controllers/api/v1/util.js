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
    console.log(targetBoxYPercentage);
    if ((targetBoxXPercentage > characterCoordinatePercentages.right || targetBoxXPercentage + 10 < characterCoordinatePercentages.left) || (targetBoxYPercentage + 10 < characterCoordinatePercentages.top || targetBoxYPercentage > characterCoordinatePercentages.top + 11)) {
        return false;
    }
    
    return true;
};

module.exports = { handleJWTGameAuthorization, targetBoxCharacterCollision };