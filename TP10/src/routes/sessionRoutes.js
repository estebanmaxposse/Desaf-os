import { Router } from "express";
const router = Router();

router.get('/session', (req, res) => {
    req.session.views = req.session.views ? req.session.views + 1 : 1
    res.send(`<h1>Views: ${req.session.views} </h1>`)
})

router.get('/pages/login', (req, res) => {
    if (!req.session) {
        res.redirect('/')
    } else {
        res.send("You're at log in")
    }
})

router.get('/user', (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        res.status(200).json({
            username: req.session.user,
            id: req.sessionID
        })
    } else {
        res.status(404).send('Not found :(')
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    req.session.user = email;
    req.session.admin = true;
    console.log(req.session);
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    let session = req.session
    console.log(session);
    res.render('logout.pug', {user: session.user})
    req.session.destroy( error => {
        if (!error) {
            console.log('User deleted');
        } else {
            res.status(400).send({status: 'Logout Error', body: error})
        }
    })
})

export default router;
