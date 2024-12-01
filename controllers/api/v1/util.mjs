import passport from "../../../config/passport.mjs";
import asyncHandler from "express-async-handler";

const handleJWTGameAuthorization = asyncHandler((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, game, info) => {
        if (err) {
            next(err);
            return;
        }
a
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

export { handleJWTGameAuthorization };a