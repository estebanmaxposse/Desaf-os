const Container = require("../class/Container");

const file = new Container("TP2/database/products.txt");

const getProducts = async (req, res) => {
  const products = JSON.parse(await file.getAll());
  res.send(products);
};

const getRandomProduct = async (req, res) => {
  const products = JSON.parse(await file.getAll());
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  res.send(randomProduct);
};

module.exports = { getProducts, getRandomProduct };