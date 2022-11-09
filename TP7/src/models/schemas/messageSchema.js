const { Schema } = require("mongoose");

const authorSchema = new Schema({
    name: { type: String },
    surname: { type: String },
    age: { type: Number },
    nick: { type: String },
    avatar: { type: String },
    id: { type: String }
})

const messageSchema = new Schema({
    author: authorSchema,
    text: { type: String, required: true },
    date: { type: String, required: true }
});

module.exports = messageSchema;