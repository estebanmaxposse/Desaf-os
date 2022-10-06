

class Products {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  // loadProducts(filepath) {
  //   this.products = File.readFile(filepath);
  // };

  // saveProduct(product, filepath) {
    
  // }

  addProduct(product) {
    try {
      const newProduct = {
        id: this.products.length
          ? this.products[this.products.length - 1].id + 1
          : 1,
        ...product,
      };
      this.products.push(newProduct);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  getProductByID(id) {
    this.getProducts;
    const product = this.products.find((product) => product.id === Number(id));
    return product;
  }

  deleteProduct(id) {
    try {
      this.getProducts;
      const deleteProduct = this.products.find((product) => product.id === Number(id)) || {
        error: "Product not found.",
      };
      this.products = this.products.filter((product) => product.id !== Number(id));
      return deleteProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  updateProduct(product, id) {
    try {
      this.getProducts;
      const { title, price, thumbnail } = product;
      const item = this.products.find((prod) => prod.id === Number(id)) || {
        error: "Product not found.",
      };
      if (item) {
        item.title = title;
        item.price = price;
        item.thumbnail = thumbnail;
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
