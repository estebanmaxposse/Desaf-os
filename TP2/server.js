const express = require('express');
const cors = require('cors');
const { getProducts, getRandomProduct } = require('./controllers/routesUtils');

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Go to /products or /randomProduct to see some items!')
});

app.get('/products', getProducts);

app.get('/randomProduct', getRandomProduct);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));