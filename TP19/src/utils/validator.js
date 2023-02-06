const productValidation = (product) => {
    if (!product.title || !product.price || !product.description || !product.code || !product.thumbnail || !product.stock || !product.timestamp || !product.category) {
        return { error: 'Please fill out every field'}
    } else {
        return product ;
    };
};

export default productValidation 
