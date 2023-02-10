import { getNewCart, getAllCarts, addProducts, getProducts, getCart, completePurchase, deleteCart, deleteProduct } from '../services/cartServices.js'
import { errorLog } from '../utils/logger.js';

const getNewCartController = async (req, res) => {
    try {
        const query = await getNewCart()
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error);
    }
}

const getAllCartsController  = async (req, res) => {
    try {
        const query = await getAllCarts()
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error);
    }
}

const addProductsController = async (req, res) => {
    const { id } = req.params
    try {
        const query = await addProducts(id, req.body)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error);
    }
}

const getProductsController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await getProducts(id)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

const getCartController = async (req, res) => {
    let { id } = req.params;
    try {
        let query = await getCart(id)
        if (query.status === 200) {
            res.status(query.status).json(query.response)
        } else {
            //TO MANAGE ERRORS LATER
            res.status(query.status).json(query.response)
        }
    } catch (error) {
        errorLog(error)
    }
}

const completePurchaseController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await completePurchase(id)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

const deleteCartController = async (req, res) => {
    let { id } = req.params;
    try {
        const query = await deleteCart(id)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

const deleteProductCartController = async (req, res) => {
    let { id, id_prod } = req.params;
    try {
        const query = await deleteProduct(id, id_prod)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    }
}

export { getNewCartController, getAllCartsController, addProductsController, getProductsController, getCartController, completePurchaseController, deleteCartController, deleteProductCartController }