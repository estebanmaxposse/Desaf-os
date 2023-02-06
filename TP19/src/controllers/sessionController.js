import { errorLog } from "../utils/logger.js";
import { getSession, getUser, loginUser, authLogin, loginFailed, signUpUser, authSignUp, signUpFailed, logout } from "../services/sessionsServices.js";

const getSessionController = async (req, res) => {
    res.send(await getSession(req.session.views))
}

const getUserController = async (req, res) => {
    let query = await getUser(req.user)
    if (query.status === 200) {
        res.send(req.user)
    } else {
        res.status(query.status).json(query.response)
    }
}

const loginUserController = async (req, res) => {
    if (req.isAuthenticated()) {
        let user = await loginUser(req.user)
        res.status(user.status).redirect('/')
    } else {
        res.redirect('/pages/login.html')
    }
}

const authLoginController = async (req, res) => {
    await authLogin()
    res.status(200).redirect('/')
}

const loginFailedController = async (req, res) => {
    await loginFailed()
    res.render('loginFailed.pug', req.user)
}

const signUpUserController = async (req, res) => {
    if (req.isAuthenticated()) {
        let user = await signUpUser(req.user)
        res.status(user.status).redirect('/')
    } else {
        res.redirect('/pages/signUp.html')
    }
}

const authSignUpController =  async (req, res) => {
    let user = await authSignUp(req.user)
    res.status(user.status).redirect('/')
}

const signUpFailedController = async (req, res) => {
    await signUpFailed()
    res.render('signUpFailed.pug', req.user)
}

const logoutController = async (req, res) => {
    try {
        let user = await logout(req.user)
        req.logout(console.log);
        res.status(user.status).render('logout.pug', {user: user.response.username})
    } catch (error) {
        errorLog(error, "Couldn't log out!")
    }
}

export { getSessionController, getUserController, loginUserController, authLoginController, loginFailedController, signUpUserController, authSignUpController, signUpFailedController, logoutController }
