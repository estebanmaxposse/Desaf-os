import * as dotenv from 'dotenv'
import path from 'path'

const dotEnvProduction = ".env.production";
const dotEnvDevelopment = ".env.development";

dotenv.config({
    path: path.resolve(process.cwd(), dotEnvDevelopment)
})

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || '8080',
    DATABASE: process.env.DATABASE || 'mongo',
    SESSION_KEY: process.env.SESSION_KEY || 'secret',
    MONGOATLAS_URL: process.env.MONGOATLAS_URL || 'mongodb+srv://estebanmaxposse:GetStuff8@ecommerce.qwzmjs0.mongodb.net/?retryWrites=true&w=majority',
    SERVER_MODE: process.env.SERVER_MODE || 'fork',
    SENT_MAIL: process.env.SENT_MAIL || 'estebanposse98@gmail.com',
    RECIEVE_MAIL: process.env.RECIEVE_MAIL || 'estebanmaxposse@hotmail.com',
    ADMIN_PHONE: process.env.ADMIN_PHONE || '+543874106249',
    TWILIO_SID: process.env.TWILIO_SID || 'AC6b268e308a6a23079bdd79aaa1bb672f',
    TWILIO_AUTH: process.env.TWILIO_AUTH || '62701df46cc4e2b782fb4481bd34405f',
    TWILIO_PHONE: process.env.TWILIO_PHONE || '17266008839',
    TWILIO_WPP: process.env.TWILIO_WPP || '+14155238886',
    TEST_PHONE: process.env.TEST_PHONE || '+5493874106249'
}