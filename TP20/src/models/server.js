import config from '../config/globalConfig.js';
import express, { json, urlencoded, static as staticFiles } from 'express';
import { Server as HttpServer } from 'http'; 
import { Server as IOServer } from 'socket.io';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productRouter from '../routes/productRoutes.js';
import cartRouter from '../routes/cartRoutes.js'
import sessionRouter from '../routes/sessionRoutes.js';
import miscRouter from '../routes/miscRoutes.js'
import forkRouter from '../utils/serverFork.js'
import socketConfig from '../utils/socket.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import args from '../utils/argsHandler.js'
import cluster from 'cluster';
import CPU from 'os'
import compression from  'compression'
import { routeLog, invalidRouteLog, log } from '../utils/logger.js';
import cors from 'cors'
import koa from 'koa'
import {koaBody} from 'koa-body';
import koaRouter from '../routes/koaProductsRoutes.js';

// import { normalizeMessage } from '../controllers/dataNormalizer.js';

const PORT = config.PORT;
log(PORT);
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)
app.use(cors())

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
app.use('/api/cart', compression(), routeLog, cartRouter)

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

// Koa framework
const koaApp = new koa()
koaApp.use(koaBody())
koaApp.use(koaRouter.routes())

const startServer = () => {
    switch (args.serverMode) {
        case 'fork':
            httpServer.listen(PORT, () => {
                log(`Server running on ${PORT}`);
            });
            koaApp.listen(8000, () => {
                log(`Koa server running on 8000`);
            } )
            break;
            
            case 'cluster':
                if (cluster.isPrimary) {
                    const numCPUs = CPU.cpus().length
                    log(`Master ${process.pid} setting up ${numCPUs} workers...`);
                    
                    for (let index = 0; index < numCPUs; index++) {
                        cluster.fork()
                }
                
                cluster.on('online', (worker) => {
                    log('Worker ' + worker.process.pid + ' is online');
                });
                cluster.on('exit', (worker, code, signal) => {
                    log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
                });
            } else {
                httpServer.listen(PORT, () => {
                    log(`Server running on ${PORT}`);
                });
            }
            break
            default:
                httpServer.listen(PORT, () => {
                    log(`Server running on ${PORT}`);
                });
                break;
            }
        }
        
io.on('connection', async (socket) => socketConfig(io, socket))
        
export default startServer;