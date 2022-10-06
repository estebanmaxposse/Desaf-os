const fs = require("fs");

class File {
  constructor(filePath) {
    this.filePath = filePath;
  };

  async readFile() {
    try {
      const content = await fs.promises.readFile(this.filePath, 'utf-8');
      return content;
    } catch (error) {
      console.log(error);
    };
  };

  async save(object) {
    try {
        for (let i = 0; i < object.length; i++) {
            object[i].id = 1 + i;
          }
          // console.log(`Added ${object.length} products!`);
          await fs.promises.writeFile(this.filePath, JSON.stringify(object));
    } catch (error) {
      throw new Error(`Failed to add products!`)
    };
  };

  async getById(id) {
    try {
      const content = JSON.parse(await this.getAll());
      let idFound = content.find((product) => product.id === id);
      console.log(`The product is ${idFound}`);
    } catch (error) {
      throw new Error(`Couldn't find ${id} product! ${error}`);
    };
  };

  async getAll() {
    try {
        const fileContent = await this.readFile();
        return fileContent;
    } catch (error) {
        throw new Error(`Couldn't read file! ${error}`);
    };
  };

  async deleteById(id) {
    const content = JSON.parse(await this.getAll());
    const toDelete = content.find((product) => product.id === id);
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(toDelete, null, 4)
      );
      console.log(`Product ${id} deleted!`);
    } catch (error) {
      console.log(`Product ${id} couldn't be deleted: ${error}`);
    };
  };

  async deleteAll() {
    try {
        await fs.promises.writeFile(this.filePath, JSON.stringify([]));
        console.log(`All products deleted!`);
    } catch (error) {
        throw new Error(`Error deleting all products: ${error}`);
    };
  };
};

module.exports = File;
