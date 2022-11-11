import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http'; 
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dbManager from '../utils/mongoManager.js';
import productRouter from '../routes/productRoutes.js';
import { normalizeMessage } from '../controllers/dataNormalizer.js';

const PORT = 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));

const productManager = new dbManager('products');
const messageManager = new dbManager('messages');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

app.set('view engine', 'pug');
app.set('views', join(__dirname, '../../views'));

app.use(json());
app.use(urlencoded({ extended: true}));
app.use(staticFiles(join(__dirname, '../../public')))

app.use(productRouter);

const startServer = () => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

io.on('connection', async (socket) => {
    socket.emit('products', await productManager.getAll());
    socket.emit('messages', await getNormalizedMessages())

    socket.on('new-product', async data => {
        await productManager.save(data);
        io.sockets.emit('products', await productManager.getAll());
    });

    socket.on('new-message', async data => {
        data.date = new Date().toLocaleString();
        await messageManager.save(data);
        io.sockets.emit('messages', await getNormalizedMessages());
    })
})

//NORMALIZE MSGS FUNCTION
const getNormalizedMessages = async () => {
    const messages = await messageManager.getAll();
    console.log(messages);
    const normalizedMessages = normalizeMessage({id: 'messages', messages});
    console.log(normalizedMessages);
    return normalizedMessages
}

export default startServer;