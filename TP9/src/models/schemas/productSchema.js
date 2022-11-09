import { Schema } from "mongoose";

const productSchema = new Schema({
    title: { type: String, require: true, max: 100 },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    code: { type: String, require: true },
    category: { type: String, require: true },
    thumbnail: { type: String, require: true },
});

export default productSchema;