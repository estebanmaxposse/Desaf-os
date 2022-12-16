import {} from 'dotenv/config'

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || '8080',
    SESSION_KEY: process.env.SESSION_KEY || 'secret',
    MONGOATLAS_URL: process.env.MONGOATLAS_URL || "mongodb+srv://estebanmaxposse:GetStuff8@ecommerce.qwzmjs0.mongodb.net/?retryWrites=true&w=majority",
    SERVER_MODE: process.env.SERVER_MODE || 'fork'
}