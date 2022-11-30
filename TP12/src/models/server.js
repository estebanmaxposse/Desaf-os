import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http'; 
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dbManager from '../utils/mongoManager.js';
import productRouter from '../routes/productRoutes.js';
import sessionRouter from '../routes/sessionRoutes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import config from '../config/globalConfig.js';
import parseArgs from 'minimist';

//Args config
const argsOptions = { default: { port: 8080 } }
const args = parseArgs(process.argv.slice(2), argsOptions)
console.log(args);

// import { normalizeMessage } from '../controllers/dataNormalizer.js';

const PORT = args.port;
const __dirname = dirname(fileURLToPath(import.meta.url));

const productManager = new dbManager('products');
const messageManager = new dbManager('messages');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

//Session Manager
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGOATLAS_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

//Views Engine
app.set('view engine', 'pug');
app.set('views', join(__dirname, '../../views'));

app.use(json());
app.use(urlencoded({ extended: true}));
app.use(staticFiles(join(__dirname, '../../public')));
app.use(cookieParser());

//Routes
app.use(productRouter);
app.use('/api/auth', sessionRouter);


const startServer = () => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
}

io.on('connection', async (socket) => {
    socket.emit('products', await productManager.getAll());
    socket.emit('messages', await messageManager.getAll())

    socket.on('new-product', async data => {
        await productManager.save(data);
        io.sockets.emit('products', await productManager.getAll());
    });

    socket.on('new-message', async data => {
        data.date = new Date().toLocaleString();
        await messageManager.save(data);
        io.sockets.emit('messages', await messageManager.getAll());
    })
})

//NORMALIZE MSGS FUNCTION
// const getNormalizedMessages = async () => {
//     const messages = await messageManager.getAll();
//     console.log(messages);
//     const normalizedMessages = normalizeMessage({id: 'messages', messages});
//     console.log(normalizedMessages);
//     return normalizedMessages
// }

export default startServer;