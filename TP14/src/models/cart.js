class Cart {
    constructor(products) {
        this.timestamp = new Date().toLocaleDateString();
        this.products = products || [];
    };
};

export default Cart