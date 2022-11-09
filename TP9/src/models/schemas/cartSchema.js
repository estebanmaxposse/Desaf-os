import { Schema } from "mongoose";

const cartSchema = new Schema({
    timestamp: { type: String, require: true },
    products: []
});

export default cartSchema;