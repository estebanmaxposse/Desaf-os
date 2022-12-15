import { readFileSync, promises, writeFileSync } from "fs";
import { join } from "path";

class File {
  constructor(name) {
    this.name = join(__dirname, '../database', `${name}` );
    
    try {
      this.content = readFileSync(this.name, 'utf-8');
      this.content = JSON.parse(this.content);
    } catch (error) {
      console.log(error);
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
          console.log('Object Saved')
        })
        .catch(e => console.log(e))
      return ({ response: 'Saved', object })
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to add object!`)
    };
  };

  async getById(id) {
    try {
      const content = await this.getAll();
      let foundElement = content.find((item) => item.id === Number(id));
      return foundElement;
    } catch (error) {
      console.log(error);
      throw new Error(`Couldn't find ${id} object! ${error}`);
    };
  };

  #updateContent(content) {
    this.content = content;
  }

  async updateItem(item) {
    try {
      const content = await this.getAll();
      const index = content.findIndex(e => e.id == item.id)
      if (index < 0) {
        console.error(`updateItem: item ${item.id} not found`)
        return;
      }
			const newElement = {...content[index], ...item}
			content[index] = newElement;
      this.#updateContent(content)

      try {
        writeFileSync(this.name, JSON.stringify(content, null, '\t'))
      } catch (error) {
        console.log(error);
      }

			return ({ response: "Updated", element: newElement })
		} catch (error) {
			console.log(error)
			return ({ response: Error `updating ${newElement}`, error })
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
      console.log(`item ${id} deleted!`);
    } catch (error) {
      console.log(`item ${id} couldn't be deleted: ${error}`);
    };
  };

  async deleteAll() {
    try {
      await promises.writeFile(this.filePath, JSON.stringify([]));
      console.log(`All products deleted!`);
    } catch (error) {
      throw new Error(`Error deleting all products: ${error}`);
    };
  };
};

export default File;
