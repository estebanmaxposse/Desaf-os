import { model } from "mongoose";
import { connect } from "mongoose";
// import { forEach } from "../database/products.json";
import productSchema from '../models/schemas/productSchema.js';

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
            console.log(error);
        }
    }
}

//setting db for the first time
const settingDb = async () => {
    try {
        //Connecting to DB
        const URL = "mongodb+srv://estebanmaxposse:GetStuff8@ecommerce.qwzmjs0.mongodb.net/?retryWrites=true&w=majority";
        let res = await connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        //Create db from json
        await forEach((elem) => {
            new products(elem).save();
            console.log(products(elem));
        });

        //delete db
        await products.deleteMany();

        //read db
        let productsFromDb = await products.find();
        console.log(productsFromDb);
    } catch (error) {
        console.log(error);
    }
};

// settingDb()

export default MongoClient;
