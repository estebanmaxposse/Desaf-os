import Router from "koa-router";
import { getProductsController, getProductController, postProductController, updateProductController, deleteProductController } from '../controllers/koaProductController.js'

const router = new Router({
    prefix: '/api-koa'
})

router.get("/", getProductsController);

router.get("/products", getProductsController);

router.get("/products/:id", getProductController);

router.post("/products", postProductController);

router.put("/products/:id", updateProductController);

router.delete("/products/:id", deleteProductController);

export default router;