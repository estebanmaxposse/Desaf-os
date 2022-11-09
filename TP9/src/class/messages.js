//const fileManager = require("../utils/fileManager")
//const messageManager = new fileManager(`messages.json`);

const dbManager = require("../utils/sqlManager");
const messageManager = new dbManager('messages', 'sqlite')

const createMessageTable = () => {
    knex.schema
        .createTable("messages", function (table) {
            table.increments("id").primary();
            table.string("author");
            table.string("text");
            table.string("date");
        })
        .then(() => {
            console.log("Table created");
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => knex.destroy());
};

//createMessageTable();

//const storedMessages = require("../database/messages.json");

const addMessagesDB = () => {
    knex("messages")
        .insert(storedMessages)
        .then(() => {
            console.log("Data inserted");
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => knex.destroy());
};

// addMessagesDB();

class Messages {
  constructor() {
    try {
      messageManager.getAll().then(
        messages => this.messages = messages
      )
    } catch (error) {
      this.messages = [];
      console.log(error);
    }
  }

  async getMessages() {
    await messageManager.getAll().then(
        messages => this.messages = messages
      )
    return this.messages;
  }

  saveMessage(message) {
    try {
      messageManager.save(message);
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  getMessageByID(id) {
    this.getMessages();
    const message = this.messages.find((message) => message.id === Number(id));
    return message;
  }

  deletemessage(id) {
    try {
      this.getMessages();
      const deleteMessage = this.messages.find((message) => message.id === Number(id)) || {
        error: "message not found.",
      };
      this.messages = this.messages.filter((message) => message.id !== Number(id));
      messageManager.deleteById(Number(id))
      return deleteMessage;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new Messages();
