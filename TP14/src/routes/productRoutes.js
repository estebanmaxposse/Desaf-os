import { Router } from "express";
const router = Router();
import productValidation from "../controllers/validator.js";
import Product from "../models/product.js";
import dbManager from '../utils/mongoManager.js';
import mockProducts from "../utils/mockProducts.js";
import { errorLog } from "../controllers/logger.js";

const productManager = new dbManager('products');
const generateProducts = new mockProducts()

const admin = true;

const checkAdmin = () => admin;

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.json(products);
    } catch (error) {
        errorLog(error)
    };
});

router.get("/api/products", async (req, res) => {
    try {
        const products = await productManager.getAll();
        const productExists = products.length !== 0;
        if (productExists) {
            res.json(products);
        } else {
            res.json({ error: "Couldn't find any products!" })
        }
    } catch (error) {
        errorLog(error)
    };
});

router.get("/api/products-test", async (req, res) => {
    try {
        const products = generateProducts.populate();
        res.render('productsRandom.pug', {products})
    } catch (error) {
        errorLog(error)
    };
});

router.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getById(id);
        let productExists = true;
        if (!product) {
            productExists = false;
        };
        if (productExists) {
            res.json(product);
        } else {
            res.json({ error: "Couldn't find the specified product!" })
            errorLog("Couldn't find the specified product!")
        }
    } catch (error) {
        errorLog(error)
    };
});

router.post("/api/products", async (req, res) => {
    if (!checkAdmin()) {
        return res.json({response: "You can not access this page"});
    }
    try {
        const { title, price, description, code, thumbnail, stock, category } = req.body;
        const newProduct = new Product(title, description, code, thumbnail, price, stock, category);
        const validatedProduct = productValidation(newProduct.title, newProduct.price, newProduct.description, newProduct.code, newProduct.thumbnail, newProduct.stock, newProduct.timestamp, newProduct.category);
        if (validatedProduct.error) {
            res.json(validatedProduct);
        } else {
            res.json(validatedProduct)
            const product = await productManager.save(validatedProduct);
        }
    } catch (error) {
        errorLog(error)
    };
});

router.put("/api/products/:id", async (req, res) => {
    if (!checkAdmin()) {
        return res.json({response: "You can not access this page"});
    }
    try {
        let { id } = req.params;
        let updatedProduct = {...req.body, id: id};
        await productManager.updateItem(updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        errorLog(error)
    };
});

router.delete("/api/products/:id", async (req, res) => {
    if (!checkAdmin()) {
        return res.json({response: "You can not access this page"});
    }
    try {
        const { id } = req.params;
        res.json(await productManager.deleteById(id));

        //Cart DAOS?
        // let allCarts = await cartManager.getAll();
        // console.log(allCarts);
        // const isMatching = product => (product._id ?? product.id).toString() === id;
        // let filteredCart = allCarts.filter(cart => cart.products.find(isMatching)).map((_, i) => i);
        // console.log(filteredCart);

        // filteredCart.forEach(i => {
        //     allCarts[i].products = allCarts[i].products.filter(product => (product._id ?? product.id).toString() !== id);
        // });

        // console.log(allCarts);



        // console.log(allCarts);
        // fs.promises.writeFile(cartManager.name, JSON.stringify(allCarts, null, '\t'))
    } catch (error) {
        errorLog(error)
    };
});

export default router;