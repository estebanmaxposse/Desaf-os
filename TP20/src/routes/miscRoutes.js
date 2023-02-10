import { Router } from "express";
const router = Router();
import info from '../utils/argsHandler.js'
import { getInfoController } from "../controllers/miscController.js";

router.get('/info', getInfoController)

export default router