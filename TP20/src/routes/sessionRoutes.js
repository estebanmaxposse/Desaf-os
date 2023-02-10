import { Router } from "express";
const router = Router();
import passport from '../config/passportStrats.js'
import { getSessionController, getUserController, loginUserController, authLoginController, loginFailedController, signUpUserController, authSignUpController, signUpFailedController, logoutController } from '../controllers/sessionController.js'

router.get('/session', getSessionController)

router.get('/user', getUserController)

router.get('/login', loginUserController)

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/auth/loginFailed'}), authLoginController)

router.get('/loginFailed', loginFailedController)

router.get('/signUp', signUpUserController)

router.post('/signUp', passport.authenticate('signUp', {failureRedirect: '/api/auth/signUpFailed'}), authSignUpController)

router.get('/signUpFailed', signUpFailedController)

router.get('/logout', logoutController)

export default router;