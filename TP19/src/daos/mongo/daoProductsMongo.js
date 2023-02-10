import ContainerMongoDB from "../mongoManager.js";

class daoProductsMongo extends ContainerMongoDB {
    constructor() {
        super('products')
    }
}

export default daoProductsMongo