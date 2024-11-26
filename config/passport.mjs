import passport from "passport";
import LocalStrategy from "passport-local";
import pool from "../db/pool.mjs";
import bcrypt from "bcryptjs";
import passportJwt from "passport-jwt";
import "dotenv/config";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
        try {
            const user = await pool.user.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {
                done(null, false, { message: "Incorrect username or password" });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                done(null, false, { message: "Incorrect username or password" });
                return;
            }

            return done(null, user);
        } catch(err) {
            done(err);
        }
    })
)

passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            const game = await pool.game.findUnique({
                where: {
                    id: parseInt(jwt_payload.id)
                }
            });

            if (!game) {
                done(null, false, { message: "Game not found" });
                return;
            }

            done(null, game);
        } catch (err) {
            done(err);
        }
    })
)

export default passport;