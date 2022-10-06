const fs = require('fs')

class Messages {
    
    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile('TP6/src/database/messages.txt','utf-8'))
        } catch {
            return []
        }
    }

    async saveMessage(message) {
        try {
            let messages = await this.getAll();
            console.log(messages);
            messages.push(message)
            await fs.promises.writeFile('TP6/src/database/messages.txt', JSON.stringify(messages, null, '\t') )
        }
        catch(error) {
            console.log(error)
        }
    }
}
module.exports = Messages
