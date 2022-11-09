const  {Schema}  = require("mongoose");

const cartSchema = new Schema({
    timestamp: { type: String, require: true },
    products: []
});

module.exports = cartSchema;