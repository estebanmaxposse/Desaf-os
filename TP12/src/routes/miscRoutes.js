import { Router } from "express";
const router = Router();
import info from '../utils/argsHandler.js'

router.get('/info', async (req, res) => {
    try {
        res.render('info.pug', { info })
    } catch (error) {
        throw new Error(error);
    }
})

export default router