class messageDTO {
    constructor(messageData) {
        this.name = messageData.author.name,
        this.surname = messageData.author.surname,
        this.age = messageData.author.age,
        this.nick = messageData.author.nick,
        this.avatar = messageData.author.avatar
        this.author = {
            name: this.name,
            surname: this.surname,
            age: this.age,
            nick: this.nick,
            avatar: this.avatar
        }
        this.text = messageData.text
        this.date = messageData.date
    }
}

export default messageDTO