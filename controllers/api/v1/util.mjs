import passport from "../../../config/passport.mjs";
import asyncHandler from "express-async-handler";

const handleJWTUserAuthorization = asyncHandler((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            next(err);
            return;
        }

        if (!user) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }

        req.user = user;
        
        next();
    })(req, res, next);
})

export { handleJWTUserAuthorization };a