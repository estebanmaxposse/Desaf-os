import { readFileSync, promises, writeFileSync } from "fs";
import { join } from "path";
import { errorLog, log } from "../utils/logger.js";

class ContainerFile {
  constructor(name) {
    this.name = join(__dirname, '../database', `${name}`);

    try {
      this.content = readFileSync(this.name, 'utf-8');
      this.content = JSON.parse(this.content);
    } catch (error) {
      errorLog(error);
      this.content = [];
      promises.writeFile(this.name, JSON.stringify(this.content, null, '\t'))
    };
  };

  async getAll() {
    return this.content;
  };

  async save(object) {
    try {
      if (this.content.length == 0) {
        object.id = 1
      } else {
        object.id = this.content.length + 1
      }
      this.content.push(object);
      promises.writeFile(this.name, JSON.stringify(this.content, null, '\t'))
        .then(() => {
          log('Object Saved')
        })
        .catch(e => errorLog(e))
      return ({ response: 'Saved', object })
    } catch (error) {
      errorLog(error, `Failed to add object!`)
    };
  };

  async getById(id) {
    try {
      const content = await this.getAll();
      let foundElement = content.find((item) => item.id === Number(id));
      return foundElement;
    } catch (error) {
      errorLog(error, `Couldn't find ${id} object! ${error}`)
    };
  };

  async getByUsername(username) {
    let foundUser
    try {
      const content = await this.getAll()
      foundUser = await content.find((user) => user.username === username)
    } catch (error) {
      errorLog(error, `Couldn't find ${username} object! ${error}`)
    }
    if (!foundUser) {
      throw new Error("User not found")
    }
    return foundUser;
  }

  #updateContent(content) {
    this.content = content;
  }

  async updateItem(item) {
    try {
      const content = await this.getAll();
      const index = content.findIndex(e => e.id == item.id)
      if (index < 0) {
        errorLog(`updateItem: item ${item.id} not found`)
        return;
      }
      const newElement = { ...content[index], ...item }
      content[index] = newElement;
      this.#updateContent(content)

      try {
        writeFileSync(this.name, JSON.stringify(content, null, '\t'))
      } catch (error) {
        errorLog(error);
      }

      return { response: `${item} updated!` };
    } catch (error) {
      errorLog(error, `Error updating ${item}`)
    }
  }

  async deleteById(id) {
    const content = await this.getAll();
    const toDelete = content.filter((item) => item.id !== Number(id));
    try {
      await promises.writeFile(
        this.name,
        JSON.stringify(toDelete, null, 4)
      );
      this.#updateContent(toDelete);
      return { response: `Deleted item: ${id}` };
    } catch (error) {
      errorLog(error, `Error deleting ${id}`)
    };
  };

  async deleteAll() {
    try {
      await promises.writeFile(this.filePath, JSON.stringify([]));
      log(`All items deleted!`);
    } catch (error) {
      errorLog(error, `Error deleting all items`)
    };
  };
};

export default ContainerFile;
