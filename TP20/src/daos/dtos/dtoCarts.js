class cartDTO {
    constructor(cart) {
        this.timestamp = cart.timestamp
        this.products = cart.products
        this.buyerID = cart.buyerID
    }
}

export default cartDTO