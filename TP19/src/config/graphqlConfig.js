import productSchemaGraphql from "../models/schemas/graphql.productSchema.js";
import { getProducts, getProduct, postProduct, updateProduct, deleteProduct } from '../services/productServices.js'

const graphqlConfig = {
    schema: productSchemaGraphql,
    rootValue: {
        getProducts,
        getProduct,
        postProduct,
        updateProduct,
        deleteProduct
    },
    graphiql: true
}

export default graphqlConfig