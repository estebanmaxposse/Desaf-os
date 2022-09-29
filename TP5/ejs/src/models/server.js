const express = require('express');
const CORS = require('cors');
const path = require('path');
const productRouter = require('../routes/productRoutes');
const PORT = 8082;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//app.use(express.static('/TP5/hbs/public'));
//app.use(CORS());

app.use(productRouter);

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = startServer;