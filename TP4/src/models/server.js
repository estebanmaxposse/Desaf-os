const express = require('express');
const CORS = require('cors');
const productRouter = require('../routes/productRoutes');
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('TP4/public'));
app.use(CORS());

app.use(productRouter);

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

module.exports = startServer;