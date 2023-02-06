import { buildSchema } from "graphql";

const productSchemaGraphql = buildSchema(`
    type responseArray {
        response: [product],
        status: Int
    }

    type responseObject {
        response: product,
        status: Int
    }

    type responseString {
        response: String,
        status: Int!
    }

    type responsePost {
        message: String,
        product: product
    }

    type product {
        _id: ID!,
        title: String,
        description: String,
        price: Int,
        stock: Int,
        code: String,
        category: String,
        thumbnail: String
    }

    input productInput {
        title: String,
        description: String,
        price: Int,
        stock: Int,
        code: String,
        category: String,
        thumbnail: String
    }

    type Query {
        getProducts: responseArray,
        getProduct(_id: ID!): responseObject
    }

    type Mutation {
        postProduct(rawProduct: productInput): responseObject,
        updateProduct(id: ID!, rawProduct: productInput): responseString,
        deleteProduct(id: ID!): responseString
    }
`)

export default productSchemaGraphql