const  {Schema}  = require("mongoose");

const productSchema = new Schema({
    title: { type: String, require: true, max: 100 },
    description: { type: String },
    price: { type: Number, require: true },
    stock: { type: Number },
    code: { type: String },
    category: { type: String },
    thumbnail: { type: String, require: true },
});

module.exports = productSchema;