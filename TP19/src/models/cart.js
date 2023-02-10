class Cart {
    constructor(products) {
        this.timestamp = new Date().toLocaleDateString();
        this.products = products || [];
        this.buyerID = '';
    };
};

export default Cart