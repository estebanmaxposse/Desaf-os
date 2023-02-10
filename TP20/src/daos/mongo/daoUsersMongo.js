import ContainerMongoDB from "../mongoManager.js";

class daoUsersMongo extends ContainerMongoDB {
    constructor() {
        super('users')
    }
}

export default daoUsersMongo