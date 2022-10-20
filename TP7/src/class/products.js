const dbManager = require("../utils/dbManager");
const productManager = new dbManager('products', 'mysql')

class Products {
  constructor() {
    try {
      productManager.getAll().then(
        products => this.products = products
      )
    } catch (error) {
      this.products = [];
      console.log(error);
    }
  }

  async getProducts() {
    await productManager.getAll().then(
      products => this.products = products
    )
    return this.products;
  }

  addProduct(product) {
    try {
      productManager.save(product);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductByID(id) {
    this.getProducts();
    const product = this.products.find((product) => product.id === Number(id));
    return product;
  }

  deleteProduct(id) {
    try {
      this.getProducts();
      const deleteProduct = this.products.find((product) => product.id === Number(id)) || {
        error: "Product not found.",
      };
      this.products = this.products.filter((product) => product.id !== Number(id));
      productManager.deleteById(deleteProduct, Number(id))
      return deleteProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  updateProduct(product, id) {
    try {
      this.getProducts();
      const { title, price, thumbnail } = product;
      const item = this.products.find((prod) => prod.id === Number(id)) || {
        error: "Product not found.",
      };
      if (item) {
        item.title = title;
        item.price = price;
        item.thumbnail = thumbnail;
        productManager.updateItem(item, item.id)
        return item;
      } else {
        return { error: "Product not found" };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new Products();
