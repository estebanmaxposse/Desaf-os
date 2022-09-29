const { Router } = require("express");
const { productValidation } = require("../controllers/services")
const Products = require("../class/products");
const router = Router();

router.get("/", (req, res) => {
  res.render('pages/index');
});
router.get("/api/products", async (req, res) => {
  try {
    const products = Products.getProducts();
    const productExists = products.length !== 0;
    res.render("pages/products", { products, productExists });
    products.forEach(element => {
        element.url = '/api/products/' + element.id
    });
  } catch (error) {
    throw new Error(error);
  }
});
router.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.getProductByID(id);
        res.render("pages/product", { product });
    } catch (error) {
        throw new Error(error);
    };
});
router.post("/api/products", async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        const newProduct = productValidation( title, price, thumbnail );
        if (newProduct.error) {
            res.send(newProduct);
        } else {
            const product = await Products.addProduct(newProduct);
            res.status(308).redirect('/')
        }
    } catch (error) {
        throw new Error(error);
    };
});
router.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const updatedProduct = productValidation( title, price, thumbnail );
        if (updatedProduct.error) {
            res.send(updatedProduct);
        } else {
            const product = await Products.updateProduct(updatedProduct, id);
            res.render("pages/product", { product, productExists});
        }
    } catch (error) {
        throw new Error(error);
    };
});
router.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.deleteProduct(id);
        res.redirect('/api/products');
    } catch (error) {
        throw new Error(error);
    };
});

module.exports = router;