import { model } from "mongoose";
import MongoClient from '../config/configMongo.js';
import productSchema from '../models/schemas/productSchema.js';
import cartSchema from '../models/schemas/cartSchema.js';
import messageSchema from '../models/schemas/messageSchema.js';
import userSchema from '../models/schemas/userSchema.js'

const client = new MongoClient('mongodb+srv://estebanmaxposse:GetStuff8@ecommerce.qwzmjs0.mongodb.net/?retryWrites=true&w=majority');
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
            console.log(error);
            throw new Error(`Failed to add object!`)
        };
    };

    async getById(id) {
        try {
            let foundElement = await this.content.findOne({ '_id': id });
            return foundElement;
        } catch (error) {
            throw new Error(`Couldn't find ${id} object! ${error}`);
        };
    };

    async getByUsername(username) {
        let foundUser;
        try {
            foundUser = await this.content.findOne({ 'username': username });
        } catch (error) {
            throw new Error(`Couldn't find ${username} object! ${error}`)
        }
        if (!foundUser) {
            throw new Error("User not found")
        }
        return foundUser;
    }

    async updateItem(item) {
        try {
            const updateItem = await this.content.updateOne({ '_id': item.id }, item)
            return { response: `${item} updated!` };
        } catch (error) {
            console.log(error);
            return { response: Error`updating ${item}`, error };
        }
    }

    async deleteById(id) {
        try {
            const deleteItem = await this.content.deleteOne({ '_id': id })
            console.log(deleteItem);
            return { response: `Deleted item: ${id}` };
        } catch (error) {
            return { response: Error`deleting ${id}`, error };
        }
    };

    async deleteAll() {
        try {
            await this.content.deleteMany();
            console.log(`All products deleted!`);
        } catch (error) {
            throw new Error(`Error deleting all products: ${error}`);
        };
    };
};

export default ContainerMongoDB;
