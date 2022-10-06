const Products = require('../class/products');

const productValidation = (title, price, thumbnail) => {
    if (!title || !price || !thumbnail) {
        return { error: 'Please fill out every field'}
    } else {
        return { title, price, thumbnail };
    };
};

module.exports = { productValidation }
