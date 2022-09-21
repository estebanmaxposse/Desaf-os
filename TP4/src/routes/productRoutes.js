const { getAllProducts, addNewProduct, getProductByID, deleteProduct, updateProduct } = require('../controllers/services');
const { Router } = require('express');
const router = Router();

router.get('/', getAllProducts);
router.get('/api/products', getAllProducts);
router.get('/api/products/:id', getProductByID);
router.post('/api/products', addNewProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);

module.exports = router;