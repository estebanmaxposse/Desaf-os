const fileManager = require("../utils/fileManager")
const messageManager = new fileManager(`messages.json`);

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

  getMessages() {
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
