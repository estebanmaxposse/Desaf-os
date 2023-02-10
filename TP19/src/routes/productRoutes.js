import { Router } from "express";
const router = Router();
import {getProductsController, getProductController, getRandomProductsController, postProductController, updateProductController, deleteProductController } from '../controllers/productController.js'

router.get("/", getProductsController);

router.get("/api/products", getProductsController);

router.get("/api/products-test", getRandomProductsController);

router.get("/api/products/:id", getProductController);

router.post("/api/products", postProductController);

router.put("/api/products/:id", updateProductController);

router.delete("/api/products/:id", deleteProductController);

export default router;