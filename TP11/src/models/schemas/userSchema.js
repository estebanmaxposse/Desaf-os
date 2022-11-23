import { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String },
    phoneNumber: { type: String },
    shippingAddress: { type: String },
    email: { type: String },
    password: { type: String },
    admin: { type: Boolean }
})

export default userSchema;