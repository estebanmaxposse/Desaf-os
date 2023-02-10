import { Router } from "express";
const router = Router();
import { fork } from 'child_process'

router.get('/api/randoms', (req, res) => {
    // let cant = req.query.cant || 100000000
    // let calculate = fork('src/controllers/forkChild.js')
    // calculate.send(cant)
    // calculate.on('message', (message) => {
    //     res.send(message)
    // })
    res.send('Route deactivated')
})

export default router