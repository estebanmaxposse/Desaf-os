const express = require('express');
const CORS = require('cors');
const path = require('path');
const productRouter = require('../routes/productRoutes');
const PORT = 8080;

const app = express();

const handlebars = require('express-handlebars');
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'layouts.hbs',
        layoutsDir: path.join(__dirname, '../../views', 'layouts'),
        partialsDir: path.join(__dirname, '../../views', 'partials')
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../../views'));

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