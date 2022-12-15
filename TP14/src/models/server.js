import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http'; 
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dbManager from '../utils/mongoManager.js';
import productRouter from '../routes/productRoutes.js';
import sessionRouter from '../routes/sessionRoutes.js';
import miscRouter from '../routes/miscRoutes.js'
import forkRouter from '../controllers/serverFork.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import config from '../config/globalConfig.js';
import args from '../utils/argsHandler.js'
import cluster from 'cluster';
import CPU from 'os'
import compression from  'compression'
import { routeLog, invalidRouteLog } from '../controllers/logger.js';

// import { normalizeMessage } from '../controllers/dataNormalizer.js';

const PORT = args.port;
console.log(PORT);
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
app.use(compression(), routeLog, productRouter);
app.use('/api/auth', compression(), routeLog, sessionRouter);
app.use(compression(), routeLog, miscRouter)
app.use(compression(), routeLog, forkRouter)

app.use(invalidRouteLog, (req, res, next) => {
    res.status(404);
    res.json({
        error: {
          'name':'Error',
          'status':404,
          'message':'Invalid Request',
          'statusCode':404,
          'stack':'http://localhost:8080/'
        },
         message: 'Testing!'
      });
    next();
   });

const startServer = () => {
    switch (args.serverMode) {
        case 'fork':
            httpServer.listen(PORT, () => {
                console.log(`Server running on ${PORT}`);
            });
            break;

        case 'cluster':
            if (cluster.isPrimary) {
                const numCPUs = CPU.cpus().length
                console.log(`Master ${process.pid} setting up ${numCPUs} workers...`);
        
                for (let index = 0; index < numCPUs; index++) {
                    cluster.fork()
                }
        
                cluster.on('online', (worker) => {
                    console.log('Worker ' + worker.process.pid + ' is online');
                });
                cluster.on('exit', (worker, code, signal) => {
                    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
                });
            } else {
                httpServer.listen(PORT, () => {
                    console.log(`Server running on ${PORT}`);
                });
            }
            break
        default:
            httpServer.listen(PORT, () => {
                console.log(`Server running on ${PORT}`);
            });
            break;
    }
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