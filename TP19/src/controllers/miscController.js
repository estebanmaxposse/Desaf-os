import { getInfo } from '../services/miscServices.js';

const getInfoController = async (req, res) => {
    try {
        let info = await getInfo()
        res.render('info.pug', { info })
    } catch (error) {
        throw new Error(error);
    }
}

export { getInfoController }