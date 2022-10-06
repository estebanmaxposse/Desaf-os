const express = require('express');
const { Server: HttpServer } = require('http'); 
const { Server: IOServer } = require('socket.io');
const path = require('path');
const Products = require("../class/products");
const Messages = require("../class/messages")
const productRouter = require('../routes/productRoutes');

const PORT = 8080;

const products = Products.getProducts();
const messages = new Messages();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../../views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../../public')))

app.use(productRouter);

const startServer = () => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

io.on('connection', async (socket) => {
    socket.emit('products', Products.getProducts());
    socket.emit('messages', await messages.getAll())

    socket.on('new-product', data => {
        Products.addProduct(data);
        io.sockets.emit('products', Products.getProducts());
    });

    socket.on('new-message', async data => {
        await messages.saveMessage(data);
        io.sockets.emit('messages', await messages.getAll());
        console.log('emitted message with ' + JSON.stringify(await messages.getAll()))
    })
})



module.exports = startServer;