import { Router } from "../deps.ts";
import { getColors, addColor } from "../handlers/colors.ts";

export const router = new Router()

router
    .get('/api', getColors)
    .get('/', getColors)
    .post('/', addColor)
    .post('/api', addColor)

