import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import dbManager from "../utils/mongoManager.js";
const userManager = new dbManager("users");
import isValidPassword from "../utils/passwordValidator.js";
import createHash from '../utils/hashGenerator.js'

passport.use(
    "login",
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userManager.getByUsername(username);
            if (!isValidPassword(user, password)) {
                console.log(`Invalid password`);
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            console.log(error);
            if (error) {
                console.log(`User not found with username ${username}`);
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
                    console.log(`User ${username} already exists`);
                    return done(null, false);
                }
            } catch (error) {
                const newUser = {
                    username: username,
                    phoneNumber: req.body.phoneNumber || '',
                    shippingAddress: req.body.shippingAddress || '',
                    email: req.body.email || '',
                    password: createHash(password),
                    admin: req.session.admin || true
                };
                const userWithId = await userManager.save(newUser)
                console.log(`Registrarion successful`);
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