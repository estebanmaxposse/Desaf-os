import ContainerMongoDB from "../mongoManager.js";

class daoCartsMongo extends ContainerMongoDB {
    constructor() {
        super('cart')
    }
}

export default daoCartsMongo