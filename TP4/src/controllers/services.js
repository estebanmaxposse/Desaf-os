const Products = require('../class/products');

const productValidation = (title, price, thumbnail) => {
    if (!title || !price || !thumbnail) {
        return { error: 'Please fill out every field'}
    } else {
        return { title, price, thumbnail };
    };
};

const getAllProducts = async (req, res) => {
    try {
        const products = Products.getProducts;
        res.send(products);
    } catch (error) {
        throw new Error(error);
    };
};

const addNewProduct = async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        const newProduct = productValidation( title, price, thumbnail );
        if (newProduct.error) {
            res.send(newProduct);
        } else {
            const product = await Products.addProduct(newProduct);
            res.send(product);
        }
    } catch (error) {
        throw new Error(error);
    };
};

const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.getProductByID(id);
        console.log('Your product is ' + product);
        res.send(product);
    } catch (error) {
        throw new Error(error);
    };
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.deleteProduct(id);
        res.send(deletedProduct);
    } catch (error) {
        throw new Error(error);
    };
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        const updatedProduct = productValidation( title, price, thumbnail );
        if (updatedProduct.error) {
            res.send(updatedProduct);
        } else {
            const product = await Products.updateProduct(updatedProduct, id);
            res.send(product);
        }
    } catch (error) {
        throw new Error(error);
    };
};

module.exports = { getAllProducts, addNewProduct, getProductByID, deleteProduct, updateProduct }