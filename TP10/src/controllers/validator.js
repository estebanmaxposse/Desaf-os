const productValidation = (title, price, description, code, thumbnail, stock, timestamp, category) => {
    if (!title || !price || !description || !code || !thumbnail || !stock || !timestamp || !category) {
        return { error: 'Please fill out every field'}
    } else {
        return { title, price, description, code, thumbnail, stock, timestamp, category };
    };
};

export default { productValidation }
