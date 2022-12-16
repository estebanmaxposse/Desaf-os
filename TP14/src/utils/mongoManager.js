import { model } from "mongoose";
import MongoClient from '../config/configMongo.js';
import productSchema from '../models/schemas/productSchema.js';
import cartSchema from '../models/schemas/cartSchema.js';
import messageSchema from '../models/schemas/messageSchema.js';
import userSchema from '../models/schemas/userSchema.js'
import config from '../config/globalConfig.js'
import { errorLog } from "../controllers/logger.js";

const client = new MongoClient(config.MONGOATLAS_URL);
client.connectDb()

class ContainerMongoDB {
    constructor(name) {
        this.collectionName = name;

        if (name === 'products') {
            this.selectedSchema = productSchema
        } else if (name === 'cart') {
            this.selectedSchema = cartSchema
        } else if (name === 'messages') {
            this.selectedSchema = messageSchema
        } else if (name === 'users') {
            this.selectedSchema = userSchema
        }

        this.content = model(this.collectionName, this.selectedSchema)
    };

    async getAll() {
        const content = await this.content.find();
        return content;
    };

    async save(object) {
        try {
            const saveObjectModel = new this.content(object);
            let savedObject = await saveObjectModel.save();
            return savedObject
        } catch (error) {
            errorLog(error, `Failed to add object!`)
        };
    };

    async getById(id) {
        try {
            let foundElement = await this.content.findOne({ '_id': id });
            return foundElement;
        } catch (error) {
            errorLog(error, `Couldn't find ${id} object! ${error}`)
        };
    };

    async getByUsername(username) {
        let foundUser;
        try {
            foundUser = await this.content.findOne({ 'username': username });
        } catch (error) {
            errorLog(error, `Couldn't find ${username} object! ${error}`)
        }
        if (!foundUser) {
            errorLog('User not found')
        }
        return foundUser;
    }

    async updateItem(item) {
        try {
            const updateItem = await this.content.updateOne({ '_id': item.id }, item)
            return { response: `${item} updated!` };
        } catch (error) {
            errorLog(error, `Error updating ${item}`)
        }
    }

    async deleteById(id) {
        try {
            const deleteItem = await this.content.deleteOne({ '_id': id })
            return { response: `Deleted item: ${id}` };
        } catch (error) {
            errorLog(error, `Error deleting ${id}`)
        }
    };

    async deleteAll() {
        try {
            await this.content.deleteMany();
            console.log(`All products deleted!`);
        } catch (error) {
            errorLog(error, `Error deleting all products`)
        };
    };
};

export default ContainerMongoDB;
