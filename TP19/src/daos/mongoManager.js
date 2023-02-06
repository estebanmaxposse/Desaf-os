import { model } from "mongoose";
import MongoClient from '../config/configMongo.js';
import productSchema from '../models/schemas/productSchema.js';
import cartSchema from '../models/schemas/cartSchema.js';
import messageSchema from '../models/schemas/messageSchema.js';
import userSchema from '../models/schemas/userSchema.js'
import config from '../config/globalConfig.js'
import { errorLog, log } from "../utils/logger.js";

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
            return await saveObjectModel.save().then(item => item);
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
            errorLog("User not found")
        }
        return foundUser;
    }

    async updateItem(item) {
        try {
            const updateItem = await this.content.updateOne({ '_id': item.id }, item)
            return updateItem
        } catch (error) {
            errorLog(error, `Error updating ${item}`)
        }
    }

    async deleteById(id) {
        try {
            const deleteItem = await this.content.deleteOne({ '_id': id })
            return deleteItem
        } catch (error) {
            errorLog(error, `Error deleting ${id}`)
        }
    };

    async deleteAll() {
        try {
            await this.content.deleteMany();
            log(`All items deleted!`);
        } catch (error) {
            errorLog(error, `Error deleting all items`)
        };
    };
};

export default ContainerMongoDB;
