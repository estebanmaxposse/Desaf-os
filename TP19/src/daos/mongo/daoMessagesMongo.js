import ContainerMongoDB from "../mongoManager.js";

class daoMessagesMongo extends ContainerMongoDB {
    constructor() {
        super('messages')
    }
}

export default daoMessagesMongo