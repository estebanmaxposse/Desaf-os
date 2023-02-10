import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../daos/daoUsers.js";
import isValidPassword from "../utils/passwordValidator.js";
import createHash from '../utils/hashGenerator.js'
import { errorLog, log } from "../utils/logger.js";

passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userManager.getByUsername(username);
            if (!isValidPassword(user, password)) {
                log(`Invalid password`);
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            errorLog(error);
            if (error) {
                log(`User not found with username ${username}`);
                return done(null, false);
            }
            return done(error) 
        }
    })
);

passport.use(
    "signUp",
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const user = await userManager.getByUsername(username);
                if (user) {
                    log(`User ${username} already exists`);
                    return done(null, false);
                }
            } catch (error) {
                const newUser = {
                    username: username,
                    fullName: req.body.fullName || '',
                    phoneNumber: req.body.phoneNumber || '',
                    shippingAddress: req.body.shippingAddress || '',
                    email: username || '',
                    password: createHash(password),
                    admin: req.session.admin || true,
                    age: req.body.age || '',
                    avatar: req.body.avatar || ''
                };
                const userWithId = await userManager.save(newUser)
                log(`Registration successful`);
                return done(null, userWithId);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    let user = await userManager.getById(id)
    done(null, user)
})

export default passport