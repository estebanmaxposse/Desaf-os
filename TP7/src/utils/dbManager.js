const { options } = require("../config/mariaDB");
const knex = require("knex")(options);

const createProductTable = () => {
    knex.schema
        .createTable("products", function (table) {
            table.increments("id").primary();
            table.string("title");
            table.string("description");
            table.integer("price");
            table.integer("stock");
            table.string("code");
            table.string("category");
            table.string("thumbnail");
        })
        .then(() => {
            console.log("Table created");
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => knex.destroy());
};

//createProductTable();

const products = require("../database/products.json");

const addProductsDB = () => {
    knex("products")
        .insert(products)
        .then(() => {
            console.log("Data inserted");
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => knex.destroy());
};

//addProductsDB();

class Database {
    constructor(name) {
        try {
            this.name = name
            this.content = knex.from(name).select('*')
            this.content = JSON.parse(this.content);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        return this.content;
    }

    async save(object) {
        try {
            this.content.push(object);
            knex(this.name).insert(object)
                .then(() => console.log('Object saved'))
                .catch(e => console.log(e))
        } catch (error) {
            console.log(error);
            throw new Error(`Failed to add object!`)
        }
    }

    async getById(id) {
        try {
            let foundElement = await knex.from(this.name).select('*').where('id', '=', Number(id));
            return foundElement;
        } catch (error) {
            console.log(error);
            throw new Error(`Couldn't find ${id} object! ${error}`);
        }
    }

    #updateContent(content) {
        this.content = content;
    }

    async updateItem(item, id) {
        try {
            let updateItem = await knex(this.name).where(item.id, '=', Number(id)).update(item);
            return updateItem;
        } catch (error) {
            console.log(error)
			return ({ response: Error `updating ${newElement}`, error })
        }
    }

    async deleteById(item, id) {
        try {
            let toDelete = await knex(this.name).where(item.id, '=', Number(id)).del();
            console.log(`item ${id} deleted!`);
        } catch (error) {
            return ({ response: Error `deleting ${item}`, error })
        }
    }

    async deleteAll() {
        try {
            await knex(this.name).del();
            console.log(`All products deleted!`);
        } catch (error) {
            return ({ response: Error `deleting ${this.name}`, error })
        }
    }
}

module.exports = Database;