import { generateProducts } from "./fakerGenerator.js";

class mockProducts {
    populate() {
        const newProducts = [];
        for (let index = 0; index < 5; index++) {
            const newProduct = generateProducts()
            newProducts.push(newProduct)
        }
        return newProducts
    }
}

export default mockProducts