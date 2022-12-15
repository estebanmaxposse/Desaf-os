import { Router } from "express";
const router = Router();
import dbManager from '../utils/mongoManager.js';
const userManager = new dbManager('users');
import passport from '../config/passportStrats.js'
import { errorLog } from "../controllers/logger.js";

router.get('/session', (req, res) => {
    req.session.views = req.session.views ? req.session.views + 1 : 1
    res.send(`<h1>Views: ${req.session.views} </h1>`)
})

router.get('/user', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.status(404).send('Not found :(')
    }
})

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user;
        console.log(`${user} is logged in`);
        res.redirect('/')
    } else {
        res.redirect('/pages/login.html')
    }
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/auth/loginFailed'}), (req, res) => res.redirect('/'))

router.get('/loginFailed', (req, res) => {
    console.log('Login failed');
    res.render('loginFailed.pug', req.user)
})

router.get('/signUp', (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user;
        console.log(`${user} is logged in`);
        res.redirect('/')
    } else {
        res.redirect('/pages/signUp.html')
    }
})

router.post('/signUp', passport.authenticate('signUp', {failureRedirect: '/api/auth/signUpFailed'}), (req, res) => res.redirect('/'))

router.get('/signUpFailed', (req, res) => {
    console.log('Sign up failed');
    res.render('signUpFailed.pug', req.user)
})

router.get('/logout', (req, res) => {
    try {
        let user = req.user
        req.logout(console.log);
        res.render('logout.pug', {user: user.username})
    } catch (error) {
        errorLog(error, "Couldn't log out!")
    }
})

export default router;
