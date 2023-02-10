import { errorLog, log } from "../utils/logger.js";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from "../services/productServices.js";

const getProductsController = async ctx => {
    try {
        let products = await getProducts()
        if (products.status === 200) {
            ctx.body = products.response
            ctx.response.status = products.status
        } else {
            //TO MANAGE ERRORS LATER
            ctx.body = products.response
            ctx.response.status = products.status
        }
    } catch (error) {
        errorLog(error)
    };
}

const getProductController = async ctx => {
    try {
        const id  = ctx.params.id;
        const product = await getProduct(id);
        if (product.status === 200) {
            ctx.body = product.response
            ctx.response.status = product.status
        } else {
            //TO MANAGE ERRORS LATER
            ctx.body = product.response
            ctx.response.status = product.status
        }
    } catch (error) {
        errorLog(error)
    };
}

const postProductController = async ctx => {
    try { 
        const rawProduct = ctx.request.body;
        let query = await postProduct(rawProduct)
        if (query.status === 201) {
            ctx.body = query.response
            ctx.response.status = query.status
        } else {
            //TO MANAGE ERRORS LATER
            ctx.body = query.response
            ctx.response.status = query.status
        }
    } catch (error) {
        errorLog(error)
    };
}

const updateProductController = async ctx => {
    try {
        let id = ctx.params.id;
        let query = await updateProduct(id, ctx.request.body)
        ctx.body = query.response
        ctx.response.status = query.status
    } catch (error) {
        errorLog(error)
    };
}

const deleteProductController = async ctx => {
    try {
        let id = ctx.params.id;
        const query = await deleteProduct(id)
        if (query.status === 200) {
            ctx.body = query.response
            ctx.response.status = query.status
        } else {
            ctx.body = query.response
            ctx.response.status = query.status
        };
    } catch (error) {
        errorLog(error)
    };
}

export { getProductsController, getProductController, postProductController, updateProductController, deleteProductController }