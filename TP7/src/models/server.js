const express = require('express');
const { Server: HttpServer } = require('http'); 
const { Server: IOServer } = require('socket.io');
const path = require('path');
const Products = require("../class/products");
const Messages = require("../class/messages");
const productRouter = require('../routes/productRoutes');

const PORT = 8080;

const products = Products.getProducts();
const messages = Messages.getMessages();

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
    socket.emit('messages', Messages.getMessages())

    socket.on('new-product', data => {
        Products.addProduct(data);
        io.sockets.emit('products', Products.getProducts());
    });

    socket.on('new-message', async data => {
        await Messages.saveMessage(data);
        io.sockets.emit('messages', Messages.getMessages());
        console.log('emitted message with ' + JSON.stringify(Messages.getMessages()))
    })
})



module.exports = startServer;