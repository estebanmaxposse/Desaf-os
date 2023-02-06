import { model } from "mongoose";
import { connect } from "mongoose";
import productSchema from '../models/schemas/productSchema.js';
import config from './globalConfig.js'
import { errorLog, log } from "../utils/logger.js";

const productsCollection = "products";

const products = model(productsCollection, productSchema);

class MongoClient {
    constructor(url) {
        this.URL = url;
    }

    async connectDb() {
        try {
            const dbUrl = this.URL;
            let res = connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (error) {
            errorLog(error);
        }
    }
}

//setting db for the first time
const settingDb = async () => {
    try {
        //Connecting to DB
        const URL = config.MONGOATLAS_URL;
        let res = await connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //Create db from json
        await forEach((elem) => {
            new products(elem).save();
            log(products(elem));
        });

        //delete db
        await products.deleteMany();

        //read db
        let productsFromDb = await products.find();
        log(productsFromDb);
    } catch (error) {
        errorLog(error);
    }
};

// settingDb()

export default MongoClient;
