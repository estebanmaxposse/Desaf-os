const Container = require('./class/Container');
const data = require('./database');

const products = new Container('./products.txt');
products.save(data);
products.getById(2);
products.getAll();
products.deleteById(2);
products.deleteAll();