import { Schema } from "mongoose";

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
    text: { type: String },
    date: { type: String }
});

export default messageSchema;