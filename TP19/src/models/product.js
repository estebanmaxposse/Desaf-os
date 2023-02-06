class Product {
    constructor(rawProduct) {
        this.timestamp = new Date().toLocaleString()
        this.title = rawProduct.title || ""
        this.description = rawProduct.description || ""
        this.code = rawProduct.code || ""
        this.thumbnail = rawProduct.thumbnail || ""
        this.price = rawProduct.price || ""
        this.stock = rawProduct.stock || ""
        this.category = rawProduct.category || ""
    }
}

export default Product