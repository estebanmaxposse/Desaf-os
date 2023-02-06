import messageDTO from "../dtos/dtoMessages.js";
import messageManager from "../daoMessages.js";

class messagesRepo {
    constructor() {
        this.dao = messageManager
    }

    async getMessages() {
        const rawMessages = await this.dao.getAll()
        const messages = rawMessages.map(m => new messageDTO(m))
        return messages
    }

    async saveMessage(rawMessage) {
        const message = new messageDTO(rawMessage)
        await this.dao.save(message);
    }
}

export default messagesRepo