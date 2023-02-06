import { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String },
    fullName: { type: String },
    phoneNumber: { type: String },
    shippingAddress: { type: String },
    email: { type: String },
    password: { type: String },
    admin: { type: Boolean },
    age: { type: Number },
    avatar: { type: String }
})

export default userSchema;