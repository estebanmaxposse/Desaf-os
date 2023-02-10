import { errorLog } from "../utils/logger.js";
import { getProducts, getRandomProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../services/productServices.js";

const getProductsController = async (req, res) => {
    try {
        let products = await getProducts()
        if (products.status === 200) {
            res.status(products.status).json(products.response)
        } else {
            //TO MANAGE ERRORS LATER
            res.status(products.status).json(products.response)
        }
    } catch (error) {
        errorLog(error)
    };
}

const getRandomProductsController = async (req, res) => {
    try {
        const products = getRandomProducts()
        res.render('productsRandom.pug', {products})
    } catch (error) {
        errorLog(error)
    };
}

const getProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProduct(id);
        if (product.status === 200) {
            res.status(product.status).json(product.response)
        } else {
            //TO MANAGE ERRORS LATER
            res.status(product.status).json(product.response)
        }
    } catch (error) {
        errorLog(error)
    };
}

const postProductController = async (req, res) => {
    try { 
        const rawProduct = req.body;
        let query = await postProduct(rawProduct)
        if (query.status === 201) {
            res.status(query.status).json(query.response)
        } else {
            //TO MANAGE ERRORS LATER
            res.status(query.status).json(query.response)
        }
    } catch (error) {
        errorLog(error)
    };
}

const updateProductController = async (req, res) => {
    try {
        let { id } = req.params;
        let query = await updateProduct(id, req.body)
        res.status(query.status).json(query.response)
    } catch (error) {
        errorLog(error)
    };
}

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const query = await deleteProduct(id)
        if (query.status === 200) {
            res.json(query.response)
        } else {
            res.status(query.status).json(query.response)
        };
    } catch (error) {
        errorLog(error)
    };
}

export { getProductsController, getProductController, getRandomProductsController, postProductController, updateProductController, deleteProductController }